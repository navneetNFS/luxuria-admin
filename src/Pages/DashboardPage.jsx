import GrantRight from "./GrantRight";
export default function DashboardPage({rights,role, isLoading}) {
  console.log(isLoading)
  if (isLoading) {
    return null;
  }
  if(Object.values(rights).filter((item)=>item).length == 0 && role != "super-admin"){
    return <GrantRight mobile={"+919717095398"} email={"navneetluxuria@gmail.com"} />
  }

  return (
    <>
      <main>
        <div className="inner-frame">
          <section className="dashboard">
            <h5 className="page-title">Dashboard</h5>
            {/* { Object.values(rights).filter((item)=>item).length > 0 || role == "super-admin" ? 'Hello' : <GrantRight mobile={"+919717095398"} email={"navneetluxuria@gmail.com"} /> } */}
          </section>
        </div>
      </main>
    </>
  )
}
