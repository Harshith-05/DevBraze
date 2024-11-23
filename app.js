// Main loop
function Run()  
{
    console.log("================================================ ");
    console.log("APPLICATION RUNNING...");
    console.log("================================================");

    // start webcam
    webcam = new WebcamCapture(video, 1280, 720, function()
    {
        console.log("Webcam ready");
        webcam.Start(0, 0);
    });

    let curTime = new Date().getTime();
    let lastTime = curTime;
    let flipTime = curTime;
    var elapsed;

    engine.runRenderLoop(function()
    {
        curTime = new Date().getTime();
        elapsed = curTime - lastTime;
        lastTime = curTime;

        fps.innerHTML = engine.getFps().toFixed() + " fps";

        if (ready && curTime - flipTime >= stream_frame_time)
        {
            if (ai_detection.capture_callback)          // <- only if you don't want ai updates after capturing the face texture!
            {
                if (ai_detection_mode > 0) ai_detection.update();
                else dynTexCtx.drawImage(video, 0,0);
                dynamicTexture.update();
            }

            flipTime = curTime;
        }

        scene.render();
        frame++;
    });
}
