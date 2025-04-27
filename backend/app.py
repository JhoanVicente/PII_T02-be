from flask import Flask, jsonify, request
from flask_cors import CORS
from src.db.config import get_connection

app = Flask(__name__)
CORS(app)

# Obtener todos los productos
@app.route('/productos', methods=['GET'])
def get_productos():
    try:
        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, nombre, precio FROM pythonBackend.productos")
            productos = cursor.fetchall()
            result = [{'id': row[0], 'nombre': row[1], 'precio': row[2]} for row in productos]
            print(result)
            return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Obtener un producto por ID
@app.route('/productos/<int:id>', methods=['GET'])
def get_producto_by_id(id):
    try:
        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id, nombre, precio FROM productos WHERE id = :id", [id])
            row = cursor.fetchone()
            if row:
                return jsonify({'id': row[0], 'nombre': row[1], 'precio': row[2]})
            else:
                return jsonify({'message': 'Producto no encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/productos', methods=['POST'])
def create_producto():
    data = request.get_json()
    try:
        with get_connection() as conn:
            cursor = conn.cursor()
            out_id = cursor.var(int)
            cursor.execute(
                "INSERT INTO productos (nombre, precio) VALUES (:1, :2) RETURNING id INTO :3",
                [data['nombre'], data['precio'], out_id]
            )
            conn.commit()
            return jsonify({
                'id': str(out_id.getvalue()[0]),
                'nombre': data['nombre'],
                'precio': data['precio']
            }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Actualizar un producto
@app.route('/productos/<int:id>', methods=['PUT'])
def update_producto(id):
    data = request.get_json()
    try:
        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "UPDATE productos SET nombre = :1, precio = :2 WHERE id = :3",
                [data['nombre'], data['precio'], id]
            )
            conn.commit()
            if cursor.rowcount == 0:
                return jsonify({'message': 'Producto no encontrado'}), 404
            return jsonify({'id': id, 'nombre': data['nombre'], 'precio': data['precio']})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Eliminar un producto
@app.route('/productos/<int:id>', methods=['DELETE'])
def delete_producto(id):
    try:
        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM productos WHERE id = :id", [id])
            conn.commit()
            if cursor.rowcount == 0:
                return jsonify({'message': 'Producto no encontrado'}), 404
            return jsonify({'message': 'Producto eliminado'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
