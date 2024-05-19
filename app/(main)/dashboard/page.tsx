import Dashboard from "@/components/Dashboard";
import { Entry } from "@prisma/client";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface DisplayProps {
    params: Entry[],
}
const DashboardPage: React.FC<DisplayProps> = ({params}) => {
    const { userId } = auth();

    if (!userId) {
      return redirectToSignIn();
    }
    return <Dashboard params={params} />
}

export default DashboardPage