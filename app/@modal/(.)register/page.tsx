import RegisterPage from "../../register/page";
import { Modal } from "@/components/ui/modal";

export default function RegisterModal() {
  return (
    <Modal>
      <div className="bg-white w-[400px] h-[600px] overflow-y-auto overflow-x-hidden p-0 relative">
        <RegisterPage />
      </div>
    </Modal>
  );
}

