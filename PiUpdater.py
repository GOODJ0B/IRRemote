import pysftp
import paramiko
import time

def pi1(reboot):
    cnopts = pysftp.CnOpts()
    cnopts.hostkeys = None

    pi = pysftp.Connection(host="192.168.0.31",username='pi',password='powerkey7', cnopts=cnopts)

    pi.put("pi.py")

    pi.close()

    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    if reboot == 1:
        ssh.connect("192.168.0.31", username="pi", password="powerkey7")
        ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command("sudo reboot")
        time.sleep(50)
        ssh.connect("192.168.0.31",username="pi",password="powerkey7")
        ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command("export DISPLAY=:0.0 && python pi.py")
    else:
        ssh.connect("192.168.0.31",username="pi",password="powerkey7")
        ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command("export DISPLAY=:0.0 && python pi.py")