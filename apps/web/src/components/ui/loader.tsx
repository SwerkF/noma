export default function Loader({
    fullScreen = false,
}: {
    fullScreen?: boolean;
}) {
    return <div className={`${fullScreen ? "h-screen w-screen" : "h-10 w-10"} flex items-center justify-center`}>
        <svg width="60" height="60" viewBox="0 0 50 50"><g transform="translate(25,25)"><g transform="rotate(0)"><circle cx="12" cy="0" r="3" fill="#60A5FA"><animate attributeName="r" values="3;4;3" dur="1s" repeatCount="indefinite" begin="0s"></animate></circle><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2s" repeatCount="indefinite"></animateTransform></g><g transform="rotate(120)"><circle cx="12" cy="0" r="3" fill="#60A5FA"><animate attributeName="r" values="3;4;3" dur="1s" repeatCount="indefinite" begin="0.3s"></animate></circle><animateTransform attributeName="transform" type="rotate" from="120" to="480" dur="2s" repeatCount="indefinite"></animateTransform></g><g transform="rotate(240)"><circle cx="12" cy="0" r="3" fill="#60A5FA"><animate attributeName="r" values="3;4;3" dur="1s" repeatCount="indefinite" begin="0.6s"></animate></circle><animateTransform attributeName="transform" type="rotate" from="240" to="600" dur="2s" repeatCount="indefinite"></animateTransform></g></g></svg>
    </div>
}