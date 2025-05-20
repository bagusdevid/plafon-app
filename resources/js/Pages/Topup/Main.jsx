import SiteLayout from "@/Layouts/SiteLayout.jsx";

export default function Main({qr}) {

    // console.log(JSON.stringify(qr));

    return <SiteLayout title="Top Up">
        <div className="px-5 lg:px-10 pt-5 lg:pt-10">
            <div className="mb-10">
                We use this QR Code to make payment or top-up, make sure your bank have active this feature.
            </div>
            {/*<div dangerouslySetInnerHTML={{ __html: qr }} />*/}
            <div className="w-[70%] mx-auto">
                <img src="/images/bagusdigital-qr.jpg" alt="" />
            </div>
        </div>
    </SiteLayout>
}
