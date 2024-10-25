import { type Patient } from "@/api";
import { Avatar } from "@/components";

type PatientCardProps = {
  patient: Patient;
};

const PatientCard = ({ patient }: PatientCardProps) => {
  return (
    <div className="bg-background-secondary rounded-lg shadow-md p-6 border border-secondary">
      <div className="flex items-center gap-2">
        <Avatar imageSrc={patient.documentPhotoPath} altText={patient.name} />
        <div>
          <h2 className="text-primary text-lg font-semibold">{patient.name}</h2>
          <p className="text-secondary-foreground">{patient.email}</p>
          <p className="text-secondary-foreground">{patient.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
