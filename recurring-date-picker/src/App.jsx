import { useState } from "react";
import { format, addDays } from "date-fns";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function RecurringDatePickerDemo() {
  const [frequency, setFrequency] = useState("weekly");
  const [interval, setInterval] = useState(1);
  const [selectedDays, setSelectedDays] = useState([]);
  const [startDate, setStartDate] = useState("2025-07-19");
  const [endDate, setEndDate] = useState("2025-08-19");
  const [previewDates, setPreviewDates] = useState([]);
  const [errors, setErrors] = useState({});

  const toggleDay = (dayIndex) => {
    setSelectedDays((prev) =>
      prev.includes(dayIndex)
        ? prev.filter((d) => d !== dayIndex)
        : [...prev, dayIndex]
    );
    setErrors((prev) => ({ ...prev, selectedDays: undefined }));
  };

  const generateDates = () => {
    const newErrors = {};

    if (interval < 1) {
      newErrors.interval = "Interval must be at least 1.";
    }

    if (new Date(startDate) > new Date(endDate)) {
      newErrors.date = "Start date must be before or equal to end date.";
    }

    if (frequency === "weekly" && selectedDays.length === 0) {
      newErrors.selectedDays = "Please select at least one weekday.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setPreviewDates([]);
      return;
    }

    setErrors({});
    const result = [];
    let current = new Date(startDate);
    const until = new Date(endDate);

    while (current <= until) {
      if (frequency === "weekly" && selectedDays.includes(current.getDay())) {
        result.push(new Date(current));
      }
      current = addDays(current, 1);
    }

    setPreviewDates(result);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-xl font-semibold">Recurring Date Picker Demo</h1>

      {/* Frequency */}
      <div>
        <label className="block font-medium">Frequency</label>
        <select
          className="border rounded px-2 py-1 w-full"
          value={frequency}
          onChange={(e) => {
            setFrequency(e.target.value);
            setErrors({});
            setPreviewDates([]);
          }}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Interval */}
      <div>
        <label className="block font-medium">Every X {frequency}s</label>
        <input
          type="number"
          min="1"
          value={interval}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value)) {
              setInterval(value);
              setErrors((prev) => ({ ...prev, interval: undefined }));
            }
          }}
          className="border rounded px-2 py-1 w-full"
        />
        {errors.interval && (
          <p className="text-red-500 text-sm mt-1">{errors.interval}</p>
        )}
      </div>

      {/* Weekly Days */}
      {frequency === "weekly" && (
        <div>
          <label className="block font-medium mb-1">Select Days</label>
          <div className="flex gap-2 flex-wrap">
            {weekdays.map((day, i) => (
              <button
                key={i}
                type="button"
                className={`px-3 py-1 rounded-full border ${
                  selectedDays.includes(i)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => toggleDay(i)}
              >
                {day}
              </button>
            ))}
          </div>
          {errors.selectedDays && (
            <p className="text-red-500 text-sm mt-1">{errors.selectedDays}</p>
          )}
        </div>
      )}

      {/* Start and End Date */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setErrors((prev) => ({ ...prev, date: undefined }));
            }}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <label className="block font-medium">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setErrors((prev) => ({ ...prev, date: undefined }));
            }}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
      </div>
      {errors.date && (
        <p className="text-red-500 text-sm mt-1">{errors.date}</p>
      )}

      {/* Generate Button */}
      <button
        onClick={generateDates}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Generate Dates
      </button>

      {/* Preview Dates */}
      {previewDates.length > 0 && (
        <div>
          <h2 className="font-semibold mb-2">Recurring Dates</h2>
          <ul className="list-disc pl-5 space-y-1">
            {previewDates.map((d, i) => (
              <li key={i}>{format(d, "PPP")}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
