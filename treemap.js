
var width = 1024,
    height = 430,
    color = d3.scale.ordinal().range(colorbrewer.Reds[9]);

var treemap = d3.layout.treemap()
    .size([width, height])
    .sticky(false)
    .value(function(d) { return d.size; });

var div = d3.select("#chart").append("div")
    .style("position", "relative")
    .style("width", width + "px")
    .style("height", height + "px");


d3.json("data/designation_type.json", function(json) {
	json.children = json.rows;
	delete json.rows;
  div.data([json]).selectAll("div")
      .data(treemap.nodes)
    .enter().append("div")
      .attr("class", "cell")
      .style("background", function(d) { return d.estilo ? color(d.size) : null; })
      .call(cell)
      .text(function(d) { return (d.estilo +' ('+ Math.round(d.size) +')') });

  d3.select("#desig_type").on("click", function() {
    loadDataJson("all");
    d3.select("#desig_type").classed("active", true);
    
  });

  d3.select("#desig_eng").on("click", function() {
	loadDataJson("desig_eng");
    d3.select("#desig_eng").classed("active", true);
  });
  d3.select("#iucn_cat").on("click", function() {
	loadDataJson("iucn_cat");
    d3.select("#iucn_cat").classed("active", true);
  });
  d3.select("#iso3").on("click", function() {
	loadDataJson("iso3");
    d3.select("#iso3").classed("active", true);
  });
  d3.select("#status_yr").on("click", function() {
	loadDataJson("status_yr");
    d3.select("#status_yr").classed("active", true);
  });
 
});

function cell() {
  this
      .style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 5) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 5) + "px"; });
}



function loadDataJson(provincia){
if(provincia === 'all'){
  thejson = "data/designation_type.json";
}else{

  if (provincia === 'desig_eng') {
    thejson = 'data/designation.json';
  }

  if (provincia === 'iucn_cat') {
    thejson = 'data/iucn_category.json';
  }

  if (provincia === 'iso3') {
    thejson = 'data/country.json';
  }

  if (provincia === 'status_yr') {
    thejson = 'data/year.json';
  }
}
d3.json(thejson, function(json) {

  json.children = json.rows;
  delete json.rows;
  div.data([json]).selectAll("div").data(treemap.nodes).exit().remove();  
  div.data([json]).selectAll("div").data(treemap.nodes).enter().append("div");  

  var extent = d3.extent(json.children, function(d) {
    return d.value;
  });

  div.data([json]).selectAll("div")
      .data(treemap.nodes)
      .attr("class", "cell")
      .style("background", function(d) {
        return d.estilo ? color(d.size) : null;
      })
      .transition()
        .duration(1500)
      .call(cell)
      .text(function(d) { return (d.estilo +' ('+ Math.round(d.size) +')')  });
      
      });
      d3.selectAll("button").classed("active", false);
      }
function trim (myString)
{
return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')
}
     