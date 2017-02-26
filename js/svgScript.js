// $('.triggers span').hover(function() {
//   // console.log(this)
//   // console.log($(this).data('letter'))
//     explode($(this).parents('.logo').attr('id'), $(this).data('letter'));
//   alert($(this).data('letter'))
// },function(){
//      implode($(this).parents('.logo').attr('id'), $(this).data('letter'));
// });

var animationMap = {}
var originalBoundingBox = {};



paper = Snap('#applyPage')

paper.attr({
  width: window.innerWidth,
  height: window.innerHeight
});

Snap.load('./assets/catalyst.svg', function(frag) {
    var svgElement = frag.select("svg");

    paper.append(svgElement)
    svgElementClone = svgElement

    var arr = svgElementClone.node.children[0].children;



    // console.log(svgElementClone.node.children[0].children)



    // svgE
    // // console.log(svgElement.children())

    paper.selectAll('#svg8 .l').forEach(function(e) {

        animationMap[e.node.id] = {
          implodingQueued: false,
          explodingQueued: false
        }


        // console.log("WHOO")
        e.hover(function(){
          // console.log(e.node.id)
          explode(null, e.node.id)
        }, function(){
          implode(null, e.node.id)
        })
                // $("#" + e.node.id).velocity({
                //   opacity: 1, transformX: 0
                // }, 10)

        // explode(null, e.node.id)
        // implode(null, e.node.id, 0)


    })

    originalBoundingBox = paper.select("#allLetters").getBBox()

    resize()

})

function resize() {

      var group = paper.select("#allLetters")
      // console.log(group)
      // console.log(group.node)
      // // console.log(group.getBBox().w)
      // console.log(paper.attr('width'))
      // console.log(group.getBBox())
      // b && group.transform("T")
      console.log(group.getBBox().w, originalBoundingBox.w)
      console.log(paper.attr('width'), window.innerWidth)
      // var dx = (paper.attr('width') - group.getBBox().w)/2
      // var dy = (paper.attr('height') - group.getBBox().h)/2
      var dx = (paper.attr('width') - originalBoundingBox.w)/2
      var dy = (paper.attr('height') - originalBoundingBox.h)/2
      // console.log(dx, dy)
      // var scaleFactor = Math.min(paper.attr('width') / group.getBBox().w, paper.attr('height') / group.getBBox().h)*.9
      var scaleFactor = Math.min(paper.attr('width') / originalBoundingBox.w, paper.attr('height') / originalBoundingBox.h)*.9
      // console.log(scaleFactor)
      group.transform("T" + dx + "," + dy+"s" + scaleFactor + "," + scaleFactor)  


}



window.onresize = function() {
  // console.log("AAAA")
  paper.attr('width', window.innerWidth)
  paper.attr('height', window.innerHeight)
  resize()
  // console.log(window.innerWidth)
  // paper.attr({
  //   width: window.innerWidth,
  //   height: window.innerHeight
  // });


}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 20) + min);
}

function explode(letterID, letter) {
    // if (animatingMap[letter])
    //   return
    // animatingMap[letter] = true
    if (animationMap[letter].explodingQueued)
      return
    animationMap[letter].explodingQueued = true
    $(' .letters g#' + letter).find('path,polygon').each(function() {

        $(this).velocity({
            translateZ: 0,
            translateX: random(-80, 200),
            translateY: random(-200, 180),
            rotateZ: "5deg",
            opacity: 0,
        }, function() {
          animationMap[letter].explodingQueued = false
        });

    });
}


function implode(letterID, letter) {
    // if (animationMap[letter].implodingQueued)
    //   return
    animationMap[letter].implodingQueued = true
    $(' .letters g#' + letter).find('path, polygon').velocity({

        translateZ: 0,
        translateX: 0,
        translateY: 0,
        opacity: 1,
        rotateZ: "0deg",

    }, [170, 15], function() {
    
      // animationMap[letter].implodingQueued = false
    }); 
};