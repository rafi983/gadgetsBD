import LoginPage from "../../login/page";
import { Modal } from "@/components/ui/modal";

export default function LoginModal() {
  return (
    <Modal>
      <div className="bg-white w-[400px] h-[600px] overflow-y-auto overflow-x-hidden p-0 relative">
        <LoginPage />
      </div>
    </Modal>
  );
}

