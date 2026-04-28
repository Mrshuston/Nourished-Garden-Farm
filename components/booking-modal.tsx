"use client"

import { useState, useMemo } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Clock, CalendarDays } from "lucide-react"

interface BookingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Available time slots (Tuesday-Thursday, after 3:30pm EST)
const timeSlots = [
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
]

export function BookingModal({ open, onOpenChange }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBooked, setIsBooked] = useState(false)

  // Only allow Tuesday (2), Wednesday (3), Thursday (4)
  const disabledDays = useMemo(() => {
    return [
      { dayOfWeek: [0, 1, 5, 6] }, // Disable Sun, Mon, Fri, Sat
      { before: new Date() }, // Disable past dates
    ]
  }, [])

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) return
    
    setIsSubmitting(true)
    // Simulate booking submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsBooked(true)
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset state after modal closes
    setTimeout(() => {
      setSelectedDate(undefined)
      setSelectedTime(undefined)
      setIsBooked(false)
    }, 300)
  }

  const getDayName = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "long" })
  }

  const getFormattedDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  if (isBooked) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-md rounded-[1.5rem] border-[#dfd0bd] bg-[#f8f3ea]">
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#8b9b72]">
              <CalendarDays className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#3e352b]">
              Call Booked!
            </h3>
            <p className="mt-3 text-[#5d5144]">
              Your free Health Strategy Call is scheduled for:
            </p>
            <p className="mt-2 font-semibold text-[#8b9b72]">
              {selectedDate && getDayName(selectedDate)},{" "}
              {selectedDate && getFormattedDate(selectedDate)}
              <br />
              at {selectedTime} EST
            </p>
            <p className="mt-4 text-sm text-[#766c5d]">
              You&apos;ll receive a confirmation email with meeting details shortly.
            </p>
            <Button
              onClick={handleClose}
              className="mt-6 rounded-full bg-[#8b9b72] px-8 text-white hover:bg-[#73845e]"
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg rounded-[1.5rem] border-[#dfd0bd] bg-[#f8f3ea] p-0 sm:max-w-xl">
        <DialogHeader className="border-b border-[#dfd0bd] p-6">
          <DialogTitle className="font-serif text-2xl font-bold text-[#3e352b]">
            Book Your Free Health Strategy Call
          </DialogTitle>
          <DialogDescription className="text-[#5d5144]">
            Select a day and time that works for you. Available Tuesday through
            Thursday after 3:30 PM EST.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto]">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#3e352b]">
              <CalendarDays size={16} className="text-[#8b9b72]" />
              Select a Date
            </div>
            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date)
                  setSelectedTime(undefined)
                }}
                disabled={disabledDays}
                className="mx-auto"
              />
            </div>
            <p className="mt-2 text-center text-xs text-[#766c5d]">
              Available: Tuesday, Wednesday, Thursday
            </p>
          </div>

          <div className="min-w-[140px]">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#3e352b]">
              <Clock size={16} className="text-[#8b9b72]" />
              Select a Time (EST)
            </div>
            <div className="space-y-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  disabled={!selectedDate}
                  className={`w-full rounded-xl px-4 py-3 text-sm font-medium transition ${
                    selectedTime === time
                      ? "bg-[#8b9b72] text-white"
                      : selectedDate
                        ? "bg-white text-[#3e352b] shadow-sm hover:bg-[#eef0e7]"
                        : "cursor-not-allowed bg-gray-100 text-gray-400"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#dfd0bd] p-6">
          {selectedDate && selectedTime && (
            <p className="mb-4 text-center text-sm text-[#5d5144]">
              Selected:{" "}
              <span className="font-semibold">
                {getDayName(selectedDate)}, {getFormattedDate(selectedDate)} at{" "}
                {selectedTime} EST
              </span>
            </p>
          )}
          <Button
            onClick={handleBooking}
            disabled={!selectedDate || !selectedTime || isSubmitting}
            className="w-full rounded-full bg-[#8b9b72] py-6 text-base text-white hover:bg-[#73845e] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Booking..." : "Confirm Booking"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
