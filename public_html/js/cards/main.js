define(["dojo/when", "dojo/parser", "dojox/mvc/getStateful", "dojo/Stateful", "dojo/query", "dojo/dom-class"
    , "dojox/fx/flip", "dojo/_base/config"
    , "dojo/domReady!", "dojo/ready", "widgets/Card"], 
function(when, parser, getStateful, Stateful, $, $cls, fx, config) {
    
    return function () {
        // public
        self = this;
        self.model = {};
        self.control = {};
        self.start = start;
        
        // construct
        console.debug('CardsMain initializing...');
        initModel();
        initControllers();
        
        function initModel() {
            self.model = getStateful({value: 'value1', displayedCard : {text : "Card text"}});
        }

        function initControllers() {
            self.control.card = {
                onclick: function(elem) {
                    console.debug('Card click');
                    $cls.toggle(elem, "red");
                    $cls.toggle(elem, "blue");
                    self.model.get('displayedCard').set({text: "Changed card text"});
                    fx.flip({node: elem}).play();
                }
            };
        }
        
        function start(callback) {
            when(parser.parse(), function() {
                console.debug('CardsMain starting');
                callback();
            }, function(err) {
                console.error(err);
            });

        }
    
    }

});