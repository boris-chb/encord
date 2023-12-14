interface ServerProps {
  params: { serverId: string };
}

export default async function ServerPage({
  params: { serverId },
}: ServerProps) {
  return <main>Select a channel</main>;
}
