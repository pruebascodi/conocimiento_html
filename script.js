const data = {
    name: "John Doe",
    title: "Director General",
    children: [
        {
            name: "Jane Smith",
            title: "Gerente de Finanzas",
            children: [
                { name: "Sara Connor", title: "Analista Financiero" },
                { name: "Kyle Reese", title: "Contador" }
            ]
        },
        {
            name: "Tom Brown",
            title: "Gerente de RRHH",
            children: [
                { name: "Linda Lee", title: "Reclutadora" },
                { name: "Mark Spencer", title: "Entrenador" }
            ]
        }
    ]
};

const width = 800;
const height = 600;

const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

const g = svg.append("g").attr("transform", "translate(100,0)");

function drawTree() {
    const treeLayout = d3.tree().size([width - 200, height - 200]);
    const root = d3.hierarchy(data);
    treeLayout(root);

    // Clear existing nodes and links
    g.selectAll(".link").remove();
    g.selectAll(".node").remove();

    // Draw links
    g.selectAll(".link")
        .data(root.links())
        .enter()
        .append("path")
        .classed("link", true)
        .attr("d", d3.linkVertical()
            .x(d => d.y)
            .y(d => d.x));

    // Draw nodes
    const node = g.selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("transform", d => `translate(${d.y},${d.x})`);

    // Cuadro que envuelve a cada miembro
    node.append("rect")
        .attr("width", d => d.data.name.length * 10 + 20) // ancho adaptativo
        .attr("height", 30) // altura fija
        .attr("y", -15); // centrar verticalmente

    node.append("text")
        .attr("dy", ".35em")
        .text(d => `${d.data.name} (${d.data.title})`);
}

document.getElementById("addMemberForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const title = document.getElementById("title").value;

    // Añadir nuevo miembro a la raíz (puedes modificar esto para añadir a nodos específicos)
    data.children.push({ name: name, title: title });
    
    // Restablecer formulario
    event.target.reset();

    // Redibujar el árbol
    drawTree();
});

// Dibuja el árbol inicialmente
drawTree();