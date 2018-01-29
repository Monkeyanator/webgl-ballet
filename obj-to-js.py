with open('teapot.obj') as teapotFile:
    teapotLines = teapotFile.readlines()

    vDef = [line.strip() for line in teapotLines if line.split(' ')[0] == 'v']
    vDef = [[float(v) for v in vertex.split(' ')[1:]] for vertex in vDef]

    fDef = [line.strip() for line in teapotLines if line.split(' ')[0] == 'f']
    fDef = [[int(f) for f in face.split(' ')[1:]] for face in fDef]

print len(fDef)
print len(vDef)

def vertex_to_string(v_tuple):
    result = "\t" 
    for v in v_tuple: 
        result += str(v) + ", "

    result += "1.00,"
    return result 

vert_str_list = []

for f in fDef:
    for v_index in f:
        vert_str_list.append(vertex_to_string(vDef[v_index - 1]))

vertexString = "var teapotVertices = new Float32Array ([\n"
vertexString += "\n".join(vert_str_list)
vertexString +=  "]);\n\n"
vertexString += "var teapotVertexCount = " + str(len(vert_str_list)) + ";"

with open('teapot.js', 'w') as outputFile: 
    outputFile.write(vertexString)