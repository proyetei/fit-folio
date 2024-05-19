import Dashboard from "@/components/Dashboard";
import { Entry } from "@prisma/client";
import { auth  } from "@clerk/nextjs/server";

interface DisplayProps {
    params: Entry[],
}
const DashboardPage: React.FC<DisplayProps> = ({params}) => {
    const { userId } = auth();

    if (!userId) {
      return auth().redirectToSignIn();
    }
    return <Dashboard params={params} />
}

export default DashboardPage