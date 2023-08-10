module.exports = {
  apps: [
    {
      max_restarts: 5,
      name: 'prefect-agent',
      script: '/home/ddp/prefect/venv/bin/prefect agent start -q ddp',
    },
    {
      max_restarts: 5,
      name: 'prefect-server',
      script: 'source /home/ddp/prefect/venv/bin/activate && GOOGLE_APPLICATION_CREDENTIALS="/home/ddp/secrets/dummy.json" prefect server start',
    },
    {
      max_restarts: 5,
      name: 'prefect-proxy',
      cwd: '/home/ddp/prefect-proxy',
      script:
        '/home/ddp/prefect-proxy/venv/bin/gunicorn proxy.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8080',
    },
    {
      max_restarts: 5,
      name: 'django-celery-worker',
      cwd: '/home/ddp/DDP_backend',
      script:
        '/home/ddp/DDP_backend/venv/bin/celery -A ddpui worker -n ddpui --pidfile /home/ddp/DDP_backend/celeryworker.pid',
    },
    {
      max_restarts: 5,
      name: 'django-backend',
      cwd: '/home/ddp/DDP_backend',
      script:
        '/home/ddp/DDP_backend/venv/bin/gunicorn -b localhost:8002 ddpui.wsgi --capture-output --log-config /home/ddp/DDP_backend/gunicorn-log.conf --timeout 60',
    },
    {
      max_restarts: 5,
      name: 'ddp-webapp',
      script: 'yarn start',
      cwd: '/home/ddp/webapp',
    },
  ],
};
