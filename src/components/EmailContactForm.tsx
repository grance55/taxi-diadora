import emailjs from "@emailjs/browser";
import { useState, FormEvent, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

// Define types for better TypeScript support
interface FormData {
  pickupLocation: string;
  destination: string;
  date: string;
  time: string;
  phoneNumber: string;
  email?: string | null;
  message?: string | null;
}

interface FormErrors {
  pickupLocation: string;
  destination: string;
  date: string;
  time: string;
  phoneNumber: string;
  email: string;
  message: string;
}

interface StatusState {
  submitted: boolean;
  submitting: boolean;
  info: {
    error: boolean;
    msg: string | null;
  };
}

export default function RideBookingForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData | any>({
    pickupLocation: "",
    destination: "",
    date: new Date().toISOString().split("T")[0],
    time: "12:00",
    phoneNumber: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<StatusState>({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    pickupLocation: "",
    destination: "",
    date: "",
    time: "",
    phoneNumber: "",
    email: "",
    message: "",
  });

  // Clear error for a field when the user corrects it
  const clearError = (fieldName: keyof FormErrors): void => {
    if (formErrors[fieldName]) {
      setFormErrors((prev) => ({
        ...prev,
        [fieldName]: "",
      }));
    }
  };

  const handleServerResponse = (ok: boolean, msg: string): void => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg },
      });
      resetForm();
    } else {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: msg },
      });
    }
  };

  const resetForm = (): void => {
    setFormData({
      pickupLocation: "",
      destination: "",
      date: new Date().toISOString().split("T")[0],
      time: "12:00",
      phoneNumber: "",
      email: "",
      message: "",
    });
    setFormErrors({
      pickupLocation: "",
      destination: "",
      date: "",
      time: "",
      phoneNumber: "",
      email: "",
      message: "",
    });
  };

  const validateForm = (): FormErrors => {
    const errors = {} as FormErrors;

    if (!formData.pickupLocation)
      errors.pickupLocation =
        t("pickup_location_required") || "Pickup location is required";
    if (!formData.destination)
      errors.destination =
        t("destination_required") || "Destination is required";
    if (!formData.date) errors.date = t("date_required") || "Date is required";
    if (!formData.time) errors.time = t("time_required") || "Time is required";
    if (!formData.phoneNumber)
      errors.phoneNumber = t("phone_required") || "Phone number is required";

    // Phone validation
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (
      formData.phoneNumber &&
      !phoneRegex.test(formData.phoneNumber.replace(/\s+/g, ""))
    ) {
      errors.phoneNumber =
        t("invalid_phone") || "Please enter a valid phone number";
    }

    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      formData?.email &&
      !emailRegex.test(formData.email.replace(/\s+/g, ""))
    ) {
      errors.email = t("invalid_email") || "Please enter a valid email address";
    }

    // Date validation - ensure it's not in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.date);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      errors.date = t("date_cannot_be_past") || "Date cannot be in the past";
    }

    return errors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    clearError(name as keyof FormErrors);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setStatus({
        submitted: false,
        submitting: false,
        info: {
          error: false,
          msg: "",
        },
      });
      setFormErrors(errors);
      return;
    }

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      handleServerResponse(
        true,
        t("booking_successful") || "Booking successful!"
      );
    } catch (error: any) {
      console.error("EmailJS error:", error);
      handleServerResponse(
        false,
        error?.message || t("something_went_wrong") || "Something went wrong"
      );
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full lg:min-w-[400px]">
      {/* Global error message */}
      {status.info.error && !status.submitting && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {status.info?.msg || t("something_went_wrong")}
        </div>
      )}

      {status.submitted ? (
        <div className="text-center">
          <div className="p-4 mb-4 bg-green-100 text-green-700 rounded-md">
            {status.info.msg}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="pickupLocation"
              className="block font-medium mb-2 text-gray-800"
            >
              {t("pickup_location")}*
            </label>
            <input
              id="pickupLocation"
              type="text"
              name="pickupLocation"
              placeholder={t("pickup_location_placeholder")}
              value={formData.pickupLocation}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
                formErrors.pickupLocation ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {formErrors.pickupLocation && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.pickupLocation}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="destination"
              className="block font-medium mb-2 text-gray-800"
            >
              {t("destination")}*
            </label>
            <input
              id="destination"
              type="text"
              name="destination"
              placeholder={t("destination_placeholder")}
              value={formData.destination}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
                formErrors.destination ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {formErrors.destination && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.destination}
              </p>
            )}
          </div>

          <div className="flex mb-4 space-x-4 flex-col md:flex-row">
            <div className="md:w-1/2 mr-0 md:mr-2 mb-4 md:mb-0">
              <label
                htmlFor="date"
                className="block font-medium mb-2 text-gray-800"
              >
                {t("date")}*
              </label>
              <div className="relative">
                <input
                  id="date"
                  type="date"
                  name="date"
                  placeholder="dd.mm.yyyy."
                  value={formData.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
                    formErrors.date ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
              </div>
              {formErrors.date && (
                <p className="text-red-500 text-sm mt-1">{formErrors.date}</p>
              )}
            </div>

            <div className="md:w-1/2 ml-0 md:ml-2">
              <label
                htmlFor="time"
                className="block font-medium mb-2 text-gray-800"
              >
                {t("time")}*
              </label>
              <div className="relative">
                <input
                  id="time"
                  type="time"
                  name="time"
                  placeholder="--:--"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
                    formErrors.time ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
              </div>
              {formErrors.time && (
                <p className="text-red-500 text-sm mt-1">{formErrors.time}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="phoneNumber"
              className="block font-medium mb-2 text-gray-800"
            >
              {t("phone")}*
            </label>
            <input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              placeholder={"+385 95 876 3084"}
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
                formErrors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {formErrors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.phoneNumber}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block font-medium mb-2 text-gray-800"
            >
              {t("email")}
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder={t("email_placeholder")}
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="block font-medium mb-2 text-gray-800"
            >
              {t("message")}
            </label>
            <input
              id="message"
              type="text"
              name="message"
              placeholder={t("message_placeholder")}
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 border-gray-300`}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={status.submitting}
              className="flex-1 bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold text-lg py-3 px-4 rounded-full transition duration-300"
            >
              {status.submitting ? t("sending") : t("book_now")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// import emailjs from "@emailjs/browser";
// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";

// export default function RideBookingForm() {
//   const { t } = useTranslation();
//   const [formData, setFormData] = useState({
//     pickupLocation: "",
//     destination: "",
//     date: new Date().toISOString().split("T")[0],
//     time: "12:00",
//     phoneNumber: "",
//   });

//   const [status, setStatus] = useState({
//     submitted: false,
//     submitting: false,
//     info: { error: false, msg: null },
//   });

//   const [formErrors, setFormErrors] = useState({
//     pickupLocation: "",
//     destination: "",
//     date: "",
//     time: "",
//     phoneNumber: "",
//   });

//   useEffect(() => {
//     console.log(formErrors);
//   }, [formErrors]);

//   const handleServerResponse = (ok: any, msg: any) => {
//     if (ok) {
//       setStatus({
//         submitted: true,
//         submitting: false,
//         info: { error: false, msg: msg },
//       });
//       setFormData({
//         pickupLocation: "",
//         destination: "",
//         date: new Date().toISOString().split("T")[0],
//         time: "12:00",
//         phoneNumber: "",
//       });
//     } else {
//       setStatus({
//         submitted: false,
//         submitting: false,
//         info: { error: true, msg: msg },
//       });
//     }
//   };

//   const validateForm = () => {
//     const errors = {} as any;

//     if (!formData.pickupLocation)
//       errors.pickupLocation = "Pickup location is required";
//     if (!formData.destination) errors.destination = "Destination is required";
//     if (!formData.date) errors.date = "Date is required";
//     if (!formData.time) errors.time = "Time is required";
//     if (!formData.phoneNumber) errors.phoneNumber = "Phone number is required";

//     // Phone validation
//     const phoneRegex = /^\+?[0-9]{10,15}$/;
//     if (
//       formData.phoneNumber &&
//       !phoneRegex.test(formData.phoneNumber.replace(/\s+/g, ""))
//     ) {
//       errors.phoneNumber = "Please enter a valid phone number";
//     }

//     return errors;
//   };

//   const handleChange = (e: any) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

//     console.log("EmailJS sending attempt with:", formData);

//     const errors = validateForm();

//     if (Object.keys(errors).length > 0) {
//       console.log("Form validation:", errors);
//       setStatus({
//         submitted: false,
//         submitting: false,
//         info: {
//           error: true,
//           msg: t("validation_error"),
//         },
//       });
//       setFormErrors(errors);
//       return;
//     } else {
//       try {
//         await emailjs.send(
//           import.meta.env.VITE_EMAILJS_SERVICE_ID,
//           import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
//           formData,
//           import.meta.env.VITE_EMAILJS_PUBLIC_KEY
//         );

//         // For now, we'll simulate a successful API call
//         setTimeout(() => {
//           console.log("EmailJS sent successfully");
//           handleServerResponse(true, t("booking_successful"));
//         }, 1000);
//       } catch (error: any) {
//         console.error("EmailJS error:", error);
//         handleServerResponse(
//           false,
//           error?.message || t("something_went_wrong")
//         );
//       }
//     }
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-md min-w-[400px]">
//       {status.info.error && !status.submitting && (
//         <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
//           {status.info?.msg || t("something_went_wrong")}
//         </div>
//       )}

//       {status.submitted ? (
//         <div className="p-4 mb-4 bg-green-100 text-green-700 rounded-md">
//           {status.info.msg}
//         </div>
//       ) : (
//         <div>
//           <div className="mb-6">
//             <label
//               htmlFor="pickupLocation"
//               className="block font-medium mb-2 text-gray-800"
//             >
//               {t("pickup_location")}
//             </label>
//             <input
//               id="pickupLocation"
//               type="text"
//               name="pickupLocation"
//               placeholder={t("pickup_location_placeholder")}
//               value={formData.pickupLocation}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label
//               htmlFor="destination"
//               className="block font-medium mb-2 text-gray-800"
//             >
//               {t("destination")}
//             </label>
//             <input
//               id="destination"
//               type="text"
//               name="destination"
//               placeholder={t("destination_placeholder")}
//               value={formData.destination}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
//               required
//             />
//           </div>

//           <div className="flex mb-6 space-x-4">
//             <div className="w-1/2">
//               <label
//                 htmlFor="date"
//                 className="block  font-medium mb-2 text-gray-800"
//               >
//                 {t("date")}
//               </label>
//               <div className="relative">
//                 <input
//                   id="date"
//                   type="date"
//                   name="date"
//                   placeholder="dd.mm.yyyy."
//                   value={formData.date}
//                   min={new Date().toISOString().split("T")[0]}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="w-1/2">
//               <label
//                 htmlFor="time"
//                 className="block font-medium mb-2 text-gray-800"
//               >
//                 {t("time")}
//               </label>
//               <div className="relative">
//                 <input
//                   id="time"
//                   type="time"
//                   name="time"
//                   placeholder="--:--"
//                   value={formData.time}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="mb-8">
//             <label
//               htmlFor="phoneNumber"
//               className="block font-medium mb-2 text-gray-800"
//             >
//               {t("phone")}
//             </label>
//             <input
//               id="phoneNumber"
//               type="tel"
//               name="phoneNumber"
//               placeholder={t("phone_placeholder")}
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
//               required
//             />
//           </div>

//           <button
//             onClick={handleSubmit}
//             disabled={status.submitting}
//             className="w-full bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold text-lg py-3 px-4 rounded-full transition duration-300"
//           >
//             {status.submitting ? t("sending") : t("book_now")}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
