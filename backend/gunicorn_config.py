import multiprocessing

# Configuración del servidor Gunicorn
bind = '0.0.0.0:8000'
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = 'tornado'
timeout = 60
keepalive = 2

# Configuración de logging
accesslog = 'logs/access.log'
errorlog = 'logs/error.log'
loglevel = 'info'

# Configuración de seguridad
user = None  # Se configurará en el entorno de producción
group = None  # Se configurará en el entorno de producción

# Configuración de rendimiento
worker_connections = 1000
max_requests = 2000
max_requests_jitter = 400