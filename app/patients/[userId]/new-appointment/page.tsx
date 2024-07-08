import Image from "next/image";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";

import * as Sentry from "@sentry/nextjs"

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  Sentry.metrics.set("user_view_new-appointment", patient.name);

  function getPatientName(name: string) {
    const parts = name.split("@");
    if (parts.length > 1) {
      return parts[0];
    } else {
      return name; // No "@" found, return entire string
    }
  }

  const userName = getPatientName(patient.name);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/curatech-logo-full.png"
            height={1000}
            width={1000}
            alt="logo"
            className="-mb-12 h-52 w-fit -ml-12"
          />

          <AppointmentForm
            patientName={userName}
            patientId={patient?.$id}
            userId={userId}
            type="create"
          />

          <p className="copyright mt-10 py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;