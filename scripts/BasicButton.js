define(function(require) {
    require('pixi');

    /**
     * A basic class that extends PIXI.Container and adds button functionality
     */
    class BasicButton extends PIXI.Container{
        constructor(){
            super();

            var _this = this;
            var _normalBtnState;
            var _overBtnState;
            var _pressedBtnState;
            var _pressedFunc;

            /**
             * 
             */
            this.init = function(labelStr, pressedFunc){
                //Store the function we want to run on button press, for use in 'press()'
                _pressedFunc = pressedFunc;
                //create the rectangles for each button state
                _normalBtnState = createButtonGraphic(0xcccccc);
                _overBtnState = createButtonGraphic(0xdddddd);
                _pressedBtnState = createButtonGraphic(0x888888);
                //set the 'normal' button state as visible
                _normalBtnState.visible = true;

                _this.on('pointerdown', press);
                _this.on('pointerup', defaultBtnState);
                _this.on('pointerupoutside', defaultBtnState);
                _this.on('pointerover', over);
                _this.on('pointerout', defaultBtnState);
                _this.eventMode = 'static';
                _this.cursor = 'pointer';

                //Add the label
                const style = {
                    fontFamily: 'Arial',
                    fontSize: 25,
                    fontWeight: 'bold',
                };
                var basicText = new PIXI.Text({text:labelStr, style});
                //centre the text and add to the container
                basicText.x = - (basicText.width >> 1);
                basicText.y = - (basicText.height >> 1);
                _this.addChild(basicText);
                //resize and recentre the text if it is too wide
                while(basicText.width > 90){
                    basicText.style.fontSize -= 1;
                    basicText.x = - (basicText.width >> 1);
                    basicText.y = - (basicText.height >> 1);
                }
            }

            function press() {
                _normalBtnState.visible = false;
                _overBtnState.visible = false;
                _pressedBtnState.visible = true;
                _pressedFunc();
            }

            function defaultBtnState() {
                _normalBtnState.visible = true;
                _overBtnState.visible = false;
                _pressedBtnState.visible = false;
            }

            function over() {
                _normalBtnState.visible = false;
                _overBtnState.visible = true;
                _pressedBtnState.visible = false;
            }

            //Used to draw the rectangle for each button state
            function createButtonGraphic(colour) {
                const g = new PIXI.Graphics(); 
                g.rect(0, 0, 100, 50);
                g.fill(colour);
                g.visible = false;
                g.x -= 50;
                g.y -= 25;
                _this.addChild(g);
                return g;
            }
        }
    }
    return BasicButton;  

});