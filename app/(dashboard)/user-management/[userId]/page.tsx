export default async function UserProfilePage(
  props: PageProps<"/user-management/[userId]">,
) {
  const { userId } = await props.params;
  return <h1>User {userId}</h1>;
}
