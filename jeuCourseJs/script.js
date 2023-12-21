const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        class Car {
            constructor(x, y, width, height, color, speed) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
                this.color = color;
                this.speed = speed;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }

            moveLeft() {
                if (this.x > 0) {
                    this.x -= this.speed;
                }
            }

            moveRight() {
                if (this.x < canvas.width - this.width) {
                    this.x += this.speed;
                }
            }
        }

        const car = new Car(canvas.width / 2 - 25, canvas.height - 80, 50, 80, "#0000FF", 5);
        const obstacles = [];
        const obstacleWidth = 50;
        const obstacleHeight = 50;
        const obstacleSpeed = 5;
        let distance = 0;
        let isGameOver = false;

        function drawObstacles() {
            ctx.fillStyle = "#FF0000";
            for (const obstacle of obstacles) {
                ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
            }
        }

        function drawDistance() {
            ctx.font = "20px Arial";
            ctx.fillStyle = "#000";
            ctx.fillText("Distance: " + distance, 10, 30);
        }

        function update() {
            if (isGameOver) return;

            // Move obstacles
            for (const obstacle of obstacles) {
                obstacle.y += obstacleSpeed;
            }

            // Remove off-screen obstacles
            obstacles.forEach((obstacle, index) => {
                if (obstacle.y > canvas.height) {
                    obstacles.splice(index, 1);
                    distance++;
                }
            });

            // Generate random obstacles
            if (Math.random() < 0.1) {
                const obstacleX = Math.random() * (canvas.width - obstacleWidth);
                const obstacleY = -obstacleHeight;
                obstacles.push({ x: obstacleX, y: obstacleY });
            }

            // Check for collisions
            for (const obstacle of obstacles) {
                if (
                    car.x < obstacle.x + obstacleWidth &&
                    car.x + car.width > obstacle.x &&
                    car.y < obstacle.y + obstacleHeight &&
                    car.y + car.height > obstacle.y
                ) {
                    gameOver();
                    return;
                }
            }

            // Draw everything
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            car.draw();
            drawObstacles();
            drawDistance();

            requestAnimationFrame(update);
        }

        function gameOver() {
            isGameOver = true;
            alert("Game Over! Distance: " + distance);
            document.location.reload();
        }

        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                car.moveLeft();
            } else if (event.key === "ArrowRight") {
                car.moveRight();
            }
        });

        update();  // Start the game loop
