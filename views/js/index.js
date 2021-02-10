var width = 944;
var height = 475;

console.log("JS FILE LOADED")
// 
// var projection = d3.geo.mercator();
let guess = []

var projection = d3.geo.equirectangular()
  // .scale(width)
  .translate([width / 2, height / 2])
  // .precision(100)
  // .fitWidth(width)
    // .scale(100)
    // .translate([0, 0]);

var svg = d3.select("#map").append("svg")
  .attr("class", "svg")
  .attr("width", width)
  .attr("height", height)
  // .attr("transform", "translate(-8, 0)")
  
var path = d3.geo.path()
  .projection(projection);

var g = svg.append("g");

let defs = svg.append("g")
  .attr("id","pointer") 
  .attr("transform", "scale(0.8)")
  .append("path")
          .attr("d", "M0-1c-14.5-25.6-14.5-25.7-14.5-33.8c0-8.1,6.5-14.6,14.5-14.6s14.5,6.6,14.5,14.6C14.5-26.7,14.5-26.6,0-1z")
  .append("path")
          .attr("d", "M0-49c7.7,0,14,6.3,14,14.1c0,8,0,8.1-14,32.8c-14-24.7-14-24.9-14-32.8C-14-42.7-7.7-49,0-49 M0-50c-8.3,0-15,6.8-15,15.1 S-15-26.5,0,0c15-26.5,15-26.5,15-34.9S8.3-50,0-50L0-50z");
      
fetch("https://raw.githubusercontent.com/cszang/dendrobox/master/data/world-110m2.json")
  .then( (response) => response.json())
  .then( (data) => {
        console.log(data)
        g.selectAll("path")
          .data(topojson.object(data, data.objects.countries)
                .geometries)
          .enter()
          .append("path")
            .attr("d", path)
            .style("stroke", "black")
            .style("fill", "white")
            // .attr("tra.nsform", "translate(-8, 0)")

// OVERLAY FOR MOUSE MOVEMENT
g.append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height)
    .on("mouseover", function() { 
        // focus.style("display", null); 
        // legend.style("display", null); 
    })
    .on("mouseout", function() { 
        // focus.style("display", "none"); 
        // legend.style("display", "none"); 
    })
    .on("mousemove", mousemove)
    .on("click", click);
 
  function click(){
    
    removePointer()

    console.log("click")
    let focusOffsetX;
    let focusOffsetY;
    let coordinates= d3.mouse(this);
    let x0 = coordinates[0];
    let y0 = coordinates[1];
    
    // console.log("X, Y", x0, y0)
    let coords = projection.invert(coordinates)
    svg
        .append("use")
        .attr("href", "#pointer")
        .attr("id", "selection")
        .attr("x", x0)
        .attr("y", y0)
        .attr("long", coords[0] )
        .attr("lat", coords[1])
        .attr("fill", "#039BE5")
        .attr("stroke", "#039BE5")
        .attr("stroke-width", "1px");      
 };
  
function mousemove() {
    let focusOffsetX;
    let focusOffsetY;
    let coordinates= d3.mouse(this);
    let x0 = coordinates[0];
    let y0 = coordinates[1];
  // console.log("X, Y", x0, y0)
  console.log(projection.invert(coordinates))
}
});

function removePointer(){
   svg.selectAll("#selection").remove()

}

function submit(){
  let guess = document.getElementById("selection")
  console.log(guess)
  let lon1 = guess.getAttribute("long")
  let lat1 = guess.getAttribute(("lat"))
  // let lon2 = 144.96332
  // let lat2 = -37.814
  let lat2 =51.50853
  let lon2 = -0.12574
  
  calcDistance(lat1, lat2, lon1, lon2)
  console.log("submit answer", guess)
}

function calcDistance(lat1, lat2, lon1, lon2){
  console.log(lat1, lat2, lon1, lon2)
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI/180; // φ, λ in radians
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;
  
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
  const d = R * c; // in metres
  console.log(d/1000)
  return d
}