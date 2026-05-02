# =============================================
#  DevHacks — AWS Infrastructure
#  Region: ap-south-1 (Mumbai)
# =============================================

# ---------- SSH Key Pair ----------
resource "aws_key_pair" "devhacks" {
  key_name   = "devhacks-key"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDShtWMS8OWnNKBQ3O0mQto+jt5thlFpGrjf7wVGTwsfGIGEFLfv9LXnd6Myvcm1BSXj1pRbjVuHugSNZG6pMSemWWuliEj42F4nlrZvgc9wQwEWS41OJc+83VEJwDgyaUbOsNh8LqpxOK/MbEXzteSQNltc7fa76qFUS/qiHF8Vf0RTHQnXdIXKPbW1xkkFoS0MJL3i9/G68HXiaJ7rXkeAzB66zBrsColFCozgCXvCny1OVh9GNQ0hsJH68x2rOWKwBcqk4NBYbUYn/sP1GXX2JAt5B2BXkzJndGN2DPH3+ZtjmCmQu9h67qZuS45emFnASOhNbIrx727mpTpQA5rkEApLf3Tc11m3Z+6tVRJaUxdvVO4esTlF6cweBnqPSQQEffoZzDfOBL2cQqDpykOOfIfdCDQ2SxJTPhfmY5PIdA1G5m9/pseCOY53+yhJCmoBxb9FmhAfPsN2yhJ0hbhXN9EeWZvN26mfpWyTZbeJRSqec/WRUymdOWgHCEPf5bhbB14Q1vYRr0mA5XEIgyfl5B0kAebvwvEjBACLS7ZNpCb+JLekQ8G/KrfWuFxqWvihqMNPVSw2XdaZwaQyBOkrkMABE80zTw2er2wKsh+fNTmd/DbNcUlr3etlnQFQf4OAXvtwm6kgXVL/ufmTkSMI7EM+gnrNOomdMR5OOzNwQ== student@student"
}

# ---------- Security Group ----------
resource "aws_security_group" "devhacks" {
  name        = "devhacks-sg"
  description = "DevHacks platform ports"

  # SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Frontend (nginx)
  ingress {
    from_port   = 5173
    to_port     = 5173
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Backend (Spring Boot)
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Jenkins
  ingress {
    from_port   = 8081
    to_port     = 8081
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # SonarQube
  ingress {
    from_port   = 9000
    to_port     = 9000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Grafana
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # All outbound
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "devhacks-sg"
    Project = "DevHacks"
  }
}

# ---------- EC2 Instance ----------
resource "aws_instance" "devhacks" {
  ami                    = "ami-04dd8a25f4efa9b82"  # Ubuntu 22.04 LTS, eu-north-1
  instance_type          = "c7i-flex.large"
  key_name               = aws_key_pair.devhacks.key_name
  vpc_security_group_ids = [aws_security_group.devhacks.id]

  root_block_device {
    volume_size = 30
    volume_type = "gp3"
  }

  tags = {
    Name    = "devhacks-server"
    Project = "DevHacks"
  }
}

# ---------- Outputs ----------
output "instance_public_ip" {
  description = "EC2 public IP — share with team and paste into inventory.ini"
  value       = aws_instance.devhacks.public_ip
}

output "ssh_command" {
  description = "SSH into the server"
  value       = "ssh -i ~/.ssh/devhacks ubuntu@${aws_instance.devhacks.public_ip}"
}

output "jenkins_url" {
  description = "Jenkins UI"
  value       = "http://${aws_instance.devhacks.public_ip}:8081"
}

output "sonarqube_url" {
  description = "SonarQube UI"
  value       = "http://${aws_instance.devhacks.public_ip}:9000"
}

output "app_frontend_url" {
  description = "React frontend"
  value       = "http://${aws_instance.devhacks.public_ip}:5173"
}

output "app_backend_url" {
  description = "Spring Boot backend API"
  value       = "http://${aws_instance.devhacks.public_ip}:8080"
}

output "grafana_url" {
  description = "Grafana UI"
  value       = "http://${aws_instance.devhacks.public_ip}:3000"
}
