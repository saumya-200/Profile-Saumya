import struct
import json
import os

def parse_glb(file_path):
    with open(file_path, 'rb') as f:
        # Read magic
        magic = f.read(4)
        if magic != b'glTF':
            print("Not a glTF file")
            return

        version = struct.unpack('<I', f.read(4))[0]
        length = struct.unpack('<I', f.read(4))[0]

        # Read JSON chunk
        chunk_length = struct.unpack('<I', f.read(4))[0]
        chunk_type = f.read(4)
        
        if chunk_type != b'JSON':
            print("First chunk is not JSON")
            return
            
        json_data = f.read(chunk_length)
        data = json.loads(json_data.decode('utf-8'))
        
        print("--- NODES ---")
        if 'nodes' in data:
            for i, node in enumerate(data['nodes']):
                print(f"Node {i}: {node.get('name', 'unnamed')}")
                if 'children' in node:
                    print(f"  Children: {node['children']}")
        else:
            print("No nodes found")

        print("\n--- MESHES ---")
        if 'meshes' in data:
            for i, mesh in enumerate(data['meshes']):
                print(f"Mesh {i}: {mesh.get('name', 'unnamed')}")

parse_glb('w:/Profile/simple-web-page/public/models/mushrooms.glb')
