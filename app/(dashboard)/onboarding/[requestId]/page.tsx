export default async function OnboardingRequestPage(
  props: PageProps<"/onboarding/[requestId]">,
) {
  const { requestId } = await props.params;
  return <h1>Onboarding Request {requestId}</h1>;
}
