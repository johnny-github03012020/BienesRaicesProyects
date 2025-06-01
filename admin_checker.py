import os
import sys
import django
import importlib.util

# Ajustar la ruta si estás ejecutando fuera del entorno
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Intentar cargar settings.py para leer configuraciones
def setup_django():
    try:
        sys.path.append(BASE_DIR)
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bienesraices_backend.settings')
        django.setup()
        print("✔️ Django configurado correctamente.")
    except Exception as e:
        print(f"❌ Error configurando Django: {e}")
        sys.exit(1)

def check_backend_and_db():
    print("\n🔎 Verificando configuración Backend + SQLite...")
    settings_path = os.path.join(BASE_DIR, 'bienesraices_backend', 'settings.py')
    db_path = os.path.join(BASE_DIR, 'db.sqlite3')

    if os.path.exists(settings_path):
        with open(settings_path, 'r') as f:
            content = f.read()
            if "'ENGINE': 'django.db.backends.sqlite3'" in content or '"ENGINE": "django.db.backends.sqlite3"' in content:
                if os.path.exists(db_path):
                    print("✔️ Backend Django con base de datos SQLite configurado.")
                    return True
                else:
                    print("⚠️ Settings configurado, pero no existe db.sqlite3.")
                    return False
            else:
                print("❌ No está configurado SQLite en settings.py.")
                return False
    else:
        print("❌ No existe settings.py.")
        return False

def check_app_and_api(app_name='properties'):
    print("\n🔎 Verificando existencia de App y API de propiedades...")

    app_dir = os.path.join(BASE_DIR, app_name)

    if os.path.exists(app_dir):
        print(f"✔️ App '{app_name}' encontrada.")
    else:
        print(f"❌ App '{app_name}' no encontrada.")
        return False

    serializers_file = os.path.join(app_dir, 'serializers.py')
    views_file = os.path.join(app_dir, 'views.py')
    urls_file = os.path.join(app_dir, 'urls.py')

    if not os.path.exists(serializers_file) or not os.path.exists(views_file):
        print(f"❌ Faltan archivos básicos en '{app_name}'.")
        return False

    print("✔️ API de Propiedades implementada (archivos principales detectados).")
    return True

def check_models(app_name='properties'):
    print("\n🔎 Verificando modelos de anuncios...")
    models_file = os.path.join(BASE_DIR, app_name, 'models.py')
    
    if not os.path.exists(models_file):
        print("❌ models.py no encontrado.")
        return False

    with open(models_file, 'r') as f:
        content = f.read()
        if 'class Property' in content:
            print("✔️ Modelo 'Property' encontrado.")
            return True
        else:
            print("❌ Modelo 'Property' no encontrado.")
            return False

def check_services_integration():
    print("\n🔎 Verificando integración con servicios externos...")
    services_dir = os.path.join(BASE_DIR, 'src', 'services')

    if os.path.exists(services_dir):
        print("✔️ Módulo de servicios externos encontrado.")
        return True
    else:
        print("❌ Módulo de servicios externos no encontrado.")
        return False

def main():
    print("🚀 Iniciando escaneo de la aplicación Django...")

    setup_django()

    backend_status = check_backend_and_db()
    api_status = check_app_and_api()
    models_status = check_models()
    services_status = check_services_integration()

    print("\n📋 Resumen del escaneo:")
    print(f"🔵 Backend + DB SQLite: {'OK' if backend_status else 'FALTA'}")
    print(f"🟣 API Propiedades: {'OK' if api_status else 'FALTA'}")
    print(f"🟠 Modelo Properties: {'OK' if models_status else 'FALTA'}")
    print(f"🟢 Integraciones externas: {'OK' if services_status else 'FALTA'}")

    print("\n✅ Escaneo completo.\n")

if __name__ == "__main__":
    main()