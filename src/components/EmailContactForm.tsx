import emailjs from "@emailjs/browser";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function RideBookingForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    pickupLocation: "",
    destination: "",
    date: new Date().toISOString().split("T")[0],
    time: "12:00",
    phoneNumber: "",
  });

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const [formErrors, setFormErrors] = useState({
    pickupLocation: "",
    destination: "",
    date: "",
    time: "",
    phoneNumber: "",
  });

  const handleServerResponse = (ok: any, msg: any) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg },
      });
      setFormData({
        pickupLocation: "",
        destination: "",
        date: "",
        time: "",
        phoneNumber: "",
      });
    } else {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: msg },
      });
    }
  };

  const validateForm = () => {
    const errors = {} as any;

    if (!formData.pickupLocation)
      errors.pickupLocation = "Pickup location is required";
    if (!formData.destination) errors.destination = "Destination is required";
    if (!formData.date) errors.date = "Date is required";
    if (!formData.time) errors.time = "Time is required";
    if (!formData.phoneNumber) errors.phoneNumber = "Phone number is required";

    // Phone validation
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (
      formData.phoneNumber &&
      !phoneRegex.test(formData.phoneNumber.replace(/\s+/g, ""))
    ) {
      errors.phoneNumber = "Please enter a valid phone number";
    }

    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

    console.log("EmailJS sending attempt with:", formData);

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      console.log("Form validation:", errors);
      setStatus({
        submitted: false,
        submitting: false,
        info: {
          error: true,
          msg: t("validation_error"),
        },
      });
      setFormErrors(errors);
      return;
    } else {
      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          formData,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );

        // For now, we'll simulate a successful API call
        setTimeout(() => {
          console.log("EmailJS sent successfully");
          handleServerResponse(true, t("booking_successful"));
        }, 1000);
      } catch (error: any) {
        console.error("EmailJS error:", error);
        handleServerResponse(
          false,
          error?.message || t("something_went_wrong")
        );
      }
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md min-w-[400px]">
      {status.info.error && !status.submitting && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {status.info?.msg || t("something_went_wrong")}
        </div>
      )}

      {status.submitted ? (
        <div className="p-4 mb-4 bg-green-100 text-green-700 rounded-md">
          {status.info.msg}
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <label
              htmlFor="pickupLocation"
              className="block font-medium mb-2 text-gray-800"
            >
              {t("pickup_location")}
            </label>
            <input
              id="pickupLocation"
              type="text"
              name="pickupLocation"
              placeholder={t("pickup_location_placeholder")}
              value={formData.pickupLocation}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="destination"
              className="block font-medium mb-2 text-gray-800"
            >
              {t("destination")}
            </label>
            <input
              id="destination"
              type="text"
              name="destination"
              placeholder={t("destination_placeholder")}
              value={formData.destination}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </div>

          <div className="flex mb-6 space-x-4">
            <div className="w-1/2">
              <label
                htmlFor="date"
                className="block  font-medium mb-2 text-gray-800"
              >
                {t("date")}
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
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  required
                />
              </div>
            </div>

            <div className="w-1/2">
              <label
                htmlFor="time"
                className="block font-medium mb-2 text-gray-800"
              >
                {t("time")}
              </label>
              <div className="relative">
                <input
                  id="time"
                  type="time"
                  name="time"
                  placeholder="--:--"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label
              htmlFor="phoneNumber"
              className="block font-medium mb-2 text-gray-800"
            >
              {t("phone")}
            </label>
            <input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              placeholder={t("phone_placeholder")}
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={status.submitting}
            className="w-full bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold text-lg py-3 px-4 rounded-full transition duration-300"
          >
            {status.submitting ? t("sending") : t("book_now")}
          </button>
        </div>
      )}
    </div>
  );
}
