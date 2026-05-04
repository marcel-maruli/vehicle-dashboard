import Button from "@/components/Button";
import Modal from "@/components/Modal";
import type { ManufactureDetailResult } from "@/lib/options/models";

type ModalDetailFormProps = {
  isOpen: boolean;
  onClose: () => void;
  data?: ManufactureDetailResult;
};

const ModalDetailForm = ({ onClose, isOpen, data }: ModalDetailFormProps) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    try {
      const timestamp = parseInt(dateStr.match(/\d+/)![0]);
      return new Date(timestamp).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const inputClass =
    "bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg p-2.5 cursor-not-allowed w-full";
  const labelClass = "text-sm font-semibold text-gray-600 mb-1";

  // Wrapper untuk setiap form group agar konsisten
  const FormGroup = ({
    label,
    value,
    isFullWidth = false,
    isTextArea = false,
  }: any) => (
    <div
      className={`flex flex-col px-3 mb-4 ${isFullWidth ? "w-full" : "w-full md:w-1/2"}`}
    >
      <label className={labelClass}>{label}</label>
      {isTextArea ? (
        <textarea
          disabled
          rows={isFullWidth ? 3 : 2}
          value={value}
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input type="text" disabled value={value} className={inputClass} />
      )}
    </div>
  );

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      className="w-200 h-[calc(100vh-20vh)]"
      title="Detail Manufacture"
    >
      <div className="p-6 h-[calc(80vh-20vh)] overflow-auto">
        {/* Container Utama menggunakan Flex Wrap */}
        <div className="flex flex-wrap -mx-3">
          <FormGroup label="Manufacturer Name" value={data?.Mfr_Name || ""} />
          <FormGroup
            label="Common Name / DBA"
            value={data?.Mfr_CommonName || "-"}
          />

          <FormGroup label="Contact Email" value={data?.ContactEmail || ""} />
          <FormGroup label="Contact Phone" value={data?.ContactPhone || ""} />

          <FormGroup
            label="Full Address"
            isFullWidth
            isTextArea
            value={`${data?.Address || ""}, ${data?.City || ""}, ${data?.StateProvince || ""}, ${data?.Country || ""} (${data?.PostalCode || ""})`}
          />

          <FormGroup
            label="Principal Name"
            value={data?.PrincipalFirstName || ""}
          />
          <FormGroup
            label="Principal Position"
            value={data?.PrincipalPosition || ""}
          />

          <FormGroup
            label="Other Details / Description"
            isFullWidth
            isTextArea
            value={data?.OtherManufacturerDetails || ""}
          />

          <FormGroup
            label="Submitted On"
            value={formatDate(data?.SubmittedOn || "")}
          />
          <FormGroup
            label="Last Updated"
            value={formatDate(data?.LastUpdated || "")}
          />
        </div>
      </div>

      {/* Action Button */}
      <div className="border-t border-gray-100 flex justify-end w-full pt-6">
        <Button
          onClick={onClose}
          size="sm"
          variant="primary"
          className="text-sm font-medium text-white"
        >
          Close Detail
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDetailForm;
