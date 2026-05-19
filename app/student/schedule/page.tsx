"use client"

import { AcademicScheduleCard } from "@/app/components/schedule/AcademicSheduleCard";
import { AcademicSummaryCard } from "@/app/components/schedule/AcademicSummaryCard";
import { ReminderItem } from "@/app/components/schedule/ReminderCard";
import { SimpleCalendar } from "@/app/components/schedule/SimpleCalender";
import { UpcomingDeadlineCard } from "@/app/components/schedule/UpcomingDeadlineCard";

export default function SchedulePage() {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  return (
    <div className="space-y-6 p-6">

      <AcademicSummaryCard gpa="3.8" credits="42" attendance="92%" year="3rd Year" />

      <AcademicScheduleCard 
        subject="Data Structures" 
        courseCode="CS201" 
        instructor="Dr. Smith" 
        startTime="10:00 AM"
        endTime="11:30 AM"
        room="Room 301"
        days={["Monday", "Wednesday", "Friday"]}
        type="lecture"
      />

      <SimpleCalendar month={currentMonth} year={currentYear} />

      <UpcomingDeadlineCard 
        title="Assignment Submission"
        date={new Date(currentYear, currentMonth - 1, 25).toLocaleDateString()}
        daysLeft={7}
        type="exam"
        priority="high"
      />

      <ReminderItem 
        id="1"
        title="Fee Payment Due"
        description="Semester fee payment deadline"
        dueDate={new Date(currentYear, currentMonth - 1, 20).toLocaleDateString()}
        time="11:59 PM"
        type="payment"
        acknowledged={false}
        onAcknowledge={() => {}}
      />

    </div>
  );
}