define(function(require) {
    require('pixi');

    /**
     * A basic class that extends PIXI.Container and adds a PIXI.Text object to it
     * functions created thus:
     * this.functionName = function(){}
     * are available externally, and can be run by calling the function from a parent or other object/class
     * Functions created in this way:
     * function functionName(){}
     * are private and can only be accessed within this class
     */
    class BasicText extends PIXI.Container{
        constructor(){
            
            super();

            //declaring local/private variables
            var _text;
            var _maxWidth;

            /**
             * 
             * @param {*} labelStr 
             * @param {*} parent 
             * @param {*} x 
             * @param {*} y 
             * @param {*} maxWidth 
             */
            this.init = function(labelStr, parent, x = 0, y = 0, maxWidth = 0){
                _maxWidth = maxWidth;
                parent.addChild(this);
                this.x = x;
                this.y = y;
                //Add the label
                const style = {
                    fontFamily: 'Arial',
                    fontSize: 25,
                    fontWeight: 'bold',
                };
                _text = new PIXI.Text({text: labelStr, style});
                this.addChild(_text);
                //Check for a maxWidth and resize if needed
                //We scale the container rather than resizing the text object
                //to make it easier in relation to things such as multiline text
                if(_maxWidth > 0){
                    if(this.width > _maxWidth){
                        this.width = _maxWidth;
                        this.scale.y = this.scale.x;
                    }
                }
            }

            /**
             * Allows you to update the text (for example, if you were showing changing data)
             * @param {*} str 
             */
            this.update = function(str){
                //We reset the scale, then set the text, then resize as we did in the init function
                this.scale.y = this.scale.x = 1;
                _text.text = str;
                if(_maxWidth > 0){
                    if(this.width > _maxWidth){
                        this.width = _maxWidth;
                        this.scale.y = this.scale.x;
                    }
                }
            }
        }
    }
    return BasicText;  

});