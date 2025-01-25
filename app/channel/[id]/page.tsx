import { fetchChannelDetail } from "@/app/utils/api";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return <div>Channel</div>;
}
