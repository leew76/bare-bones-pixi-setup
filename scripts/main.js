//Adding the requirejs config to load the pixi and gsap libraries
require.config({
    packages: [
        {
            name: 'gsap',
            location: 'dependencies/gsap/minified',
            main: 'gsap.min'
        },
        {
            name: 'pixi',
            location: 'dependencies',
            main: 'pixi'
        }
    ]
});

/**
 * Main entry point for the application
 */
define(function(require) {

    require('pixi');
    require('gsap');
    //how we import our own classes for the project
    var BasicButton     = require('./BasicButton');
    var BasicText       = require('./BasicText');

    //local vars
    var _canvasSize = {width: 1920, height: 1080};
    var _mainPixiApp;
    var _renderer;
    var _controls;
    var _exampleButton;
    var _exampleGraphics;


    /**
     * Create our pixi app/canvas
     */
    async function init(){
        //Create and add the canvas
        _mainPixiApp = new PIXI.Application();
        await _mainPixiApp.init({ background: 0xaaaaaa, width:_canvasSize.width, height: _canvasSize.height});
        globalThis.__PIXI_APP__ = _mainPixiApp;
        document.body.appendChild(_mainPixiApp.canvas);
        _renderer = _mainPixiApp.renderer;

        _controls = new PIXI.Container();
        _mainPixiApp.stage.addChild(_controls);

        //Example button
        _exampleButton = new BasicButton();
        _exampleButton.init("ExampleBtn", () => {
            console.log("Example button clicked");
            //Example of using GSAP tweening with a Graphic shape
            //First, we stop any current tweens, so repeated clicks don't interfere with each other, then we reset the position
            gsap.killTweensOf(_exampleGraphics);
            _exampleGraphics.x = 100;
            _exampleGraphics.y = 200;
            //Now we tween the graphic shape to a new position
            gsap.to(_exampleGraphics, {x: 200, y: 200, duration: 2, ease: "bounce"});
        });
        _controls.addChild(_exampleButton);
        _exampleButton.x = 100;
        _exampleButton.y = 100;

        const titleText = new BasicText();
        titleText.init("EXAMPLE TEXT", _mainPixiApp.stage, 50, 30);

        //Add a basic graphic shape example
        _exampleGraphics = new PIXI.Graphics();
        _exampleGraphics.rect(0, 0, 50, 50);
        _exampleGraphics.fill("0x555555");
        _mainPixiApp.stage.addChild(_exampleGraphics);
        _exampleGraphics.x = 100;
        _exampleGraphics.y = 200;
        
        //Add the listener for resizing the canvas
        window.addEventListener("resize", resizeCanvas, false);
        //run manually on startup as well
        resizeCanvas();

        //Example of passing the delta time to a class for animation, if you're not e.g. using GSAP for an animation
        _mainPixiApp.ticker.add((delta) => {
            //_someClass.animate(delta);
        });
        
    }


    /**
     * 
     * @param {*} e 
     */
    function resizeCanvas(e) {
        if(_mainPixiApp !== undefined && _mainPixiApp.canvas !== undefined)  {
            //First, we get the proportions of the canvas
            var aspectRatio = _canvasSize.width / _canvasSize.height;
            //Get the available window size
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // Set the width of the canvas to the width of the window area and then maintain the proportions for height
            let newWidth = windowWidth;
            let newHeight = newWidth / aspectRatio;

            // If the new height is greater than the window height, adjust the width and height accordingly
            // (If this happens, given we have a 'wider than height' canvas, 
            // it likely means the available window has an even wider aspect ratio in relation to the canvas)
            if(newHeight > windowHeight - 5){
                newHeight = windowHeight - 5;
                newWidth = newHeight * aspectRatio;
            }

            // Set the new dimensions of the canvas
            _mainPixiApp.view.style.width = `${newWidth}px`;
            _mainPixiApp.view.style.height = `${newHeight}px`;

            // Update the scale of the stage to match the new size of the canvas
            _mainPixiApp.stage.scale.set(newWidth / _canvasSize.width, newHeight / _canvasSize.height);
        }
    }

    init();

    // Added to allow PIXI dev tools to work in Chrome. See: https://chromewebstore.google.com/detail/pixijs-devtools/aamddddknhcagpehecnhphigffljadon
    window.top.globalThis.__PIXI_APP__ = window.pixiApp;
});