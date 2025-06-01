import os
import sys
import subprocess
import django

# Configuración inicial
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_NAME = 'gestion_inmobiliaria'
APP_NAME = 'core'

def setup_django():
    try:
        sys.path.append(BASE_DIR)
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', f'{PROJECT_NAME}.settings')
        django.setup()
    except Exception as e:
        print(f"❌ Error configurando Django: {e}")
        sys.exit(1)

def check_and_create_backend_and_db():
    print("\n🔎 Verificando Backend + SQLite...")
    settings_path = os.path.join(BASE_DIR, PROJECT_NAME, 'settings.py')
    db_path = os.path.join(BASE_DIR, 'db.sqlite3')

    if not os.path.exists(settings_path):
        print("❌ Proyecto Django no encontrado.")
        create_django_project()
    else:
        print("✔️ Proyecto Django encontrado.")

    if not os.path.exists(db_path):
        print("⚠️ Base de datos no encontrada. Creando...")
        subprocess.run(['python', 'manage.py', 'migrate'])
        print("✔️ Base de datos SQLite creada.")
    else:
        print("✔️ Base de datos SQLite existente.")

def create_django_project():
    print(f"🛠️ Creando proyecto Django '{PROJECT_NAME}'...")
    subprocess.run(['django-admin', 'startproject', PROJECT_NAME, '.'])
    print(f"✔️ Proyecto '{PROJECT_NAME}' creado.")

def check_and_create_app():
    print(f"\n🔎 Verificando App '{APP_NAME}'...")

    app_dir = os.path.join(BASE_DIR, APP_NAME)

    if not os.path.exists(app_dir):
        print(f"⚠️ App '{APP_NAME}' no encontrada. Creando...")
        subprocess.run(['python', 'manage.py', 'startapp', APP_NAME])
        print(f"✔️ App '{APP_NAME}' creada.")

        # Agregar la app a settings.py automáticamente
        settings_file = os.path.join(BASE_DIR, PROJECT_NAME, 'settings.py')
        with open(settings_file, 'r') as f:
            content = f.read()

        if f"'{APP_NAME}'" not in content:
            content = content.replace('INSTALLED_APPS = [', f'INSTALLED_APPS = [\n    \'{APP_NAME}\',')
            with open(settings_file, 'w') as f:
                f.write(content)
            print(f"✔️ App '{APP_NAME}' añadida a INSTALLED_APPS en settings.py.")
    else:
        print(f"✔️ App '{APP_NAME}' existente.")

def install_drf_if_needed():
    print("\n🔎 Verificando instalación de Django REST Framework...")
    try:
        import rest_framework
        print("✔️ Django REST Framework ya instalado.")
    except ImportError:
        print("⚠️ Django REST Framework no encontrado. Instalando...")
        subprocess.run(['pip', 'install', 'djangorestframework'])
        print("✔️ Django REST Framework instalado.")

def check_and_create_api_files():
    print("\n🔎 Verificando archivos para API...")

    app_dir = os.path.join(BASE_DIR, APP_NAME)

    # Crear serializers.py
    serializers_path = os.path.join(app_dir, 'serializers.py')
    if not os.path.exists(serializers_path):
        print("⚠️ serializers.py no encontrado. Creando...")
        with open(serializers_path, 'w') as f:
            f.write(
                "from rest_framework import serializers\n"
                "from .models import Anuncio\n\n"
                "class AnuncioSerializer(serializers.ModelSerializer):\n"
                "    class Meta:\n"
                "        model = Anuncio\n"
                "        fields = '__all__'\n"
            )
        print("✔️ serializers.py creado.")
    else:
        print("✔️ serializers.py existente.")

    # Crear views.py
    views_path = os.path.join(app_dir, 'views.py')
    if not os.path.exists(views_path):
        print("⚠️ views.py no encontrado. Creando...")
        with open(views_path, 'w') as f:
            f.write(
                "from rest_framework import viewsets\n"
                "from .models import Anuncio\n"
                "from .serializers import AnuncioSerializer\n\n"
                "class AnuncioViewSet(viewsets.ModelViewSet):\n"
                "    queryset = Anuncio.objects.all()\n"
                "    serializer_class = AnuncioSerializer\n"
            )
        print("✔️ views.py creado con AnuncioViewSet.")
    else:
        print("✔️ views.py existente.")

    # Crear urls.py
    urls_path = os.path.join(app_dir, 'urls.py')
    if not os.path.exists(urls_path):
        print("⚠️ urls.py no encontrado. Creando...")
        with open(urls_path, 'w') as f:
            f.write(
                "from django.urls import path, include\n"
                "from rest_framework.routers import DefaultRouter\n"
                "from .views import AnuncioViewSet\n\n"
                "router = DefaultRouter()\n"
                "router.register(r'anuncios', AnuncioViewSet)\n\n"
                "urlpatterns = [\n"
                "    path('', include(router.urls)),\n"
                "]\n"
            )
        print("✔️ urls.py creado con rutas API REST.")
    else:
        print("✔️ urls.py existente.")

def check_and_create_models():
    print("\n🔎 Verificando modelo Anuncio en models.py...")

    models_file = os.path.join(BASE_DIR, APP_NAME, 'models.py')

    with open(models_file, 'r') as f:
        content = f.read()

    if 'class Anuncio' not in content:
        print("⚠️ Modelo 'Anuncio' no encontrado. Creando...")
        with open(models_file, 'a') as f:
            f.write(
                "\n\nclass Anuncio(models.Model):\n"
                "    titulo = models.CharField(max_length=255)\n"
                "    descripcion = models.TextField()\n"
                "    precio = models.DecimalField(max_digits=10, decimal_places=2)\n"
                "    fecha_publicacion = models.DateTimeField(auto_now_add=True)\n\n"
                "    def __str__(self):\n"
                "        return self.titulo\n"
            )
        print("✔️ Modelo 'Anuncio' creado en models.py.")
    else:
        print("✔️ Modelo 'Anuncio' ya existe.")

def check_and_create_services_folder():
    print("\n🔎 Verificando módulo de servicios externos...")

    services_dir = os.path.join(BASE_DIR, 'services')

    if not os.path.exists(services_dir):
        print("⚠️ Carpeta 'services/' no encontrada. Creando...")
        os.makedirs(services_dir)
        with open(os.path.join(services_dir, '__init__.py'), 'w') as f:
            f.write("# Módulo de servicios externos")
        print("✔️ Carpeta 'services/' creada.")
    else:
        print("✔️ Carpeta 'services/' existente.")

def update_project_urls():
    print("\n🔎 Verificando integración de urls.py del proyecto...")

    project_urls_path = os.path.join(BASE_DIR, PROJECT_NAME, 'urls.py')

    with open(project_urls_path, 'r') as f:
        content = f.read()

    if f"path('api/', include('{APP_NAME}.urls'))" not in content:
        content = content.replace(
            "from django.urls import path",
            "from django.urls import path, include"
        )
        insert_point = content.find('urlpatterns = [')
        if insert_point != -1:
            insert_point = content.find('[', insert_point) + 1
            new_content = content[:insert_point] + f"\n    path('api/', include('{APP_NAME}.urls'))," + content[insert_point:]
            with open(project_urls_path, 'w') as f:
                f.write(new_content)
            print("✔️ API routes añadidas al urls.py del proyecto.")
    else:
        print("✔️ API routes ya configuradas en urls.py.")

def main():
    print("🚀 Iniciando Starter Builder versión 3...")

    setup_django()

    check_and_create_backend_and_db()
    check_and_create_app()
    install_drf_if_needed()
    check_and_create_models()
    check_and_create_api_files()
    update_project_urls()
    check_and_create_services_folder()

    print("\n✔️ Starter completo preparado. ¡Listo para usar! 🎯")

if __name__ == "__main__":
    main()