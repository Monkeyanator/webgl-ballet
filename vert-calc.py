def vertex_to_string(v_tuple):
    result = "" 
    for v in v_tuple: 
        result += str(v) + ", "

    result += "1.00,"
    return result 

verts = [
            (2, -1, 2),
            (2, -1, -2),
            (2, 1, -2),
            (2, 1, 2),
            (1.5, 1.5, 0),
            (-1.5, 1.5, 0),
            (-2, -1, 2),
            (-2, 1, 2),
            (-2, 1, -2),
            (-2, -1, -2)
        ]

normalized_verts = [(vertex[0] / 4.0, vertex[1] / 4.0, vertex[2] / 4.0) for vertex in verts]

faces = [
            (0, 1, 2),
            (0, 2, 3),
            (0, 3, 6),
            (6, 3, 7),
            (7, 9, 8),
            (6, 9, 7),
            (9, 1, 2),
            (9, 2, 8),
            (6, 0, 1),
            (6, 1, 9),
            (7, 5, 8),
            (3, 2, 4),
            (7, 3, 5),
            (5, 3, 4),
            (8, 5, 2),
            (2, 5, 4)
        ]

vert_str_list = []

for f in faces:
    for v_index in f:
        vert_str_list.append(vertex_to_string(normalized_verts[v_index]))

print "\n".join(vert_str_list)
print "VERTEX COUNT: " + str(len(vert_str_list))
