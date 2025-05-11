import SiteLayout from "@/Layouts/SiteLayout.jsx";

export default function Main({qr}) {

    // console.log(JSON.stringify(qr));

    return <SiteLayout title="Top Up">
        <div>
            We use this QR Code to make payment or top-up, make sure your bank have active this feature.
        </div>
        <div dangerouslySetInnerHTML={{ __html: qr }} />
    </SiteLayout>
}
