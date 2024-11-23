<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$alsoasked_api_key = 'aa-live-05ac60a478421d4a-8XXXXXXXXXXXXXXXXXXXXXa30404793de4474';

function getAlsoAskedData($query) {
    $curl = curl_init();
    
    curl_setopt_array($curl, [
        CURLOPT_URL => "https://alsoaskedapi.com/v1/search?query=" . urlencode($query),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            "Accept: application/json",
            "X-Api-Key: " . $alsoasked_api_key
        ],
    ]);

    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    if ($err) {
        return ["error" => $err];
    }

    return json_decode($response, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['query'])) {
    $data = getAlsoAskedData($_GET['query']);
    echo json_encode($data);
} else {
    echo json_encode(["error" => "Query parameter required"]);
}
?>