import React, { useEffect, useRef, useState } from 'react';
import "./SectionA.css";

const DinoGame = () => {
  const canvasRef = useRef(null);
  const [isJumping, setIsJumping] = useState(false);
  const [jumpHeight, setJumpHeight] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [obstacles, setObstacles] = useState([
    {
      x: 900,
      y: 230,
      image: '/tnt-removebg-preview.png',
      passed: false,
      visualWidth: 42,
      visualHeight: 42,
      hitboxWidth: 35,
      hitboxHeight: 35,
      offsetX: -10,
      offsetY: -2,
    },
    {
      x: 1200,
      y: 120,
      image: '/dragon-removebg-preview.png',
      passed: false,
      visualWidth: 80,
      visualHeight: 80,
      hitboxWidth: 70,
      hitboxHeight: 70,
      offsetX: -15,
      offsetY: -15,
    },
    {
      x: 1600,
      y: 230,
      image: '/tnt-removebg-preview.png',
      passed: false,
      visualWidth: 42,
      visualHeight: 42,
      hitboxWidth: 35,
      hitboxHeight: 35,
      offsetX: -10,
      offsetY: -2,
    },
    {
      x: 2200,
      y: 230,
      image: '/tnt-removebg-preview.png',
      passed: false,
      visualWidth: 42,
      visualHeight: 42,
      hitboxWidth: 35,
      hitboxHeight: 35,
      offsetX: -10,
      offsetY: -2,
    },
    {
      x: 2500,
      y: 230,
      image: '/tnt-removebg-preview.png',
      passed: false,
      visualWidth: 42,
      visualHeight: 42,
      hitboxWidth: 35,
      hitboxHeight: 35,
      offsetX: -10,
      offsetY: -2,
    },
    {
      x: 2800,
      y: 120,
      image: '/dragon-removebg-preview.png',
      passed: false,
      visualWidth: 80,
      visualHeight: 80,
      hitboxWidth: 70,
      hitboxHeight: 70,
      offsetX: -15,
      offsetY: -15,
    },
    {
      x: 3200,
      y: 230,
      image: '/tnt-removebg-preview.png',
      passed: false,
      visualWidth: 42,
      visualHeight: 42,
      hitboxWidth: 35,
      hitboxHeight: 35,
      offsetX: -10,
      offsetY: -2,
    },
  ]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [obstacleSpeed, setObstacleSpeed] = useState(0.04);
  const [jumpPower, setJumpPower] = useState(0.04);
  const [dinoImage, setDinoImage] = useState(new Image());
  const [groundImage, setGroundImage] = useState(new Image());
  const [score, setScore] = useState(0);
  const [canJump, setCanJump] = useState(true); // Novo estado para controlar o pulo

  dinoImage.src = 'dinoAI-removebg-preview.png';
  groundImage.src = '/mineground.jpg';

  const jumpSound = useRef(null);
  const gameOverSound = useRef(null);
  const score50Sound = useRef(null);
  const backgroundMusic = useRef(null);

  useEffect(() => {
    jumpSound.current = new Audio('/path/to/jump-sound.mp3'); // Adicione o caminho para o som de pulo
    gameOverSound.current = new Audio('/Minecraft Villager Hurt Sound Effect.mp4');
    score50Sound.current = new Audio('/100.mp3');
    backgroundMusic.current = new Audio('/C418 - Sweden (Caution & Crisis Remix).mp4');

    jumpSound.current.volume = 0.5;
    gameOverSound.current.volume = 1;
    score50Sound.current.volume = 0.2;
    backgroundMusic.current.volume = 0.4;
  }, []);

  const dinoX = 100;
  const dinoWidth = 70;
  const dinoHeight = 60;
  const groundHeight = 269;

  const dinoBaseY = groundHeight - dinoHeight - -10;
  const dinoY = dinoBaseY - jumpHeight;

  // Definindo as dimensões da hitbox do dino
  const dinoHitboxWidth = 60;
  const dinoHitboxHeight = 40;

  const drawGame = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    ctx.drawImage(groundImage, 0, groundHeight, ctx.canvas.width, 60);
    
    const visualDinoWidth = 100;
    const visualDinoHeight = 80;
    ctx.drawImage(dinoImage, dinoX, dinoY - (visualDinoHeight - dinoHeight), visualDinoWidth, visualDinoHeight);

    obstacles.forEach(({ x, y, image, visualWidth, visualHeight, offsetX, offsetY }) => {
      const obstacleImage = new Image();
      obstacleImage.src = image;

      ctx.drawImage(obstacleImage, x + offsetX, y + offsetY, visualWidth, visualHeight);
    });

    const marginTop = 10;
const scoreText = `Score: ${score}`;
const letterSpacing = 2; // Define o espaçamento entre letras
ctx.font = 'bold 28px myfontt';    
ctx.fillStyle = 'rgb(207, 194, 6)';

let x = 20; // Posição inicial
const y = 30 + marginTop; // Posição vertical

// Desenha cada letra do texto separadamente
for (let char of scoreText) {
  ctx.fillText(char, x, y);
  x += ctx.measureText(char).width + letterSpacing; // Aumenta x para o espaçamento
}
  };


  const isColliding = (dinoX, dinoY, obstacle) => {
    const obstacleCenterX = obstacle.x + obstacle.hitboxWidth / 2 + obstacle.offsetX;
    const obstacleCenterY = obstacle.y + obstacle.hitboxHeight / 2 + obstacle.offsetY;
    const dx = dinoX + dinoHitboxWidth / 2 - obstacleCenterX;
    const dy = dinoY + dinoHitboxHeight / 2 - obstacleCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (dinoHitboxWidth / 2 + obstacle.hitboxWidth / 2);
  };

  const updateGame = () => {
    if (isJumping) {
      if (jumpHeight < 120) {
        setJumpHeight((prevHeight) => prevHeight + jumpPower);
      } else {
        setIsJumping(false);
      }
    } else if (jumpHeight > 0) {
      setJumpHeight((prevHeight) => {
        const newHeight = prevHeight - jumpPower;
        if (newHeight <= 0) {
          setJumpHeight(0);
          setCanJump(true); // Permite pular novamente após o pulo concluir
        }
        return newHeight > 0 ? newHeight : 0;
      });
    }

    if (isGameStarted) {
      setObstacles((prevObstacles) => {
        return prevObstacles.map((obstacle) => {
          const newX = obstacle.x - obstacleSpeed;
          let newPassed = obstacle.passed;
          if (!newPassed && newX < dinoX - 20) {
            setScore((prevScore) => {
              const newScore = prevScore + 1;
              if (newScore % 10 === 0) {
                score50Sound.current.play();
              }
              return newScore;
            });
            newPassed = true;
          }
          if (newX < -20) {
            return { ...obstacle, x: 2800, passed: false };
          }
          return { ...obstacle, x: newX, passed: newPassed };
        });
      });
    }

    obstacles.forEach((obstacle) => {
      if (isColliding(dinoX, dinoY, obstacle)) {
        setIsGameOver(true);
        gameOverSound.current.play();
        backgroundMusic.current.pause();
        backgroundMusic.current.currentTime = 0;
        console.log('Colisão detectada!');
      }
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const gameLoop = () => {
      if (!isGameOver) {
        updateGame();
        drawGame(ctx);
        animationFrameId = requestAnimationFrame(gameLoop);
      }
    };

    gameLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isJumping, jumpHeight, obstacles, isGameOver, obstacleSpeed, jumpPower, score]);

  const handleJump = () => {
    if (!isJumping && canJump) {
      jumpSound.current.currentTime = 0;
      jumpSound.current.play();
      setIsJumping(true);
      setJumpHeight(0);
      setCanJump(false); // Impede pular novamente até que canJump seja true
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        if (event.repeat) {
          return; // Ignora se a tecla está sendo segurada
        }
        if (!isGameStarted) {
          setIsGameStarted(true);
          backgroundMusic.current.play();
        } else if (!isGameOver) {
          handleJump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isGameOver, isGameStarted, canJump]);

  useEffect(() => {
    const speedInterval = setInterval(() => {
      if (!isGameOver) {
        setObstacleSpeed((prevSpeed) => prevSpeed + 0.002);
        setJumpPower((prevPower) => prevPower + 0.002);
      }
    }, 1000);

    return () => {
      clearInterval(speedInterval);
    };
  }, [isGameOver]);

  
  return (
    <div>
      <div className="toptext">Press the SPACE BAR to start the Game</div>
      <div className='Boxgame'>
        <canvas ref={canvasRef} width={1900} height={300} style={{ border: '1px solid black' }} />
        {isGameOver && (
          <div className='boxfail'>
            <h1>GAME OVER</h1>
            <h2>Score: {score}</h2>
            <button className="botaogame" onClick={handleRestart}><p>RESTART</p></button>
          </div>
        )}
      </div>
      {/* Seção de ícones de área de trabalho */}
      <div className="desktop-icons">
        <div className="iconA">
          <img src="/Outlook_Express_XP_Icon.webp" alt="Icon A" />
          <p>Outlook Express</p>
        </div>
        <div className="iconB">
          <img src="/internet.png" alt="Icon B" />
          <p>Internet Explorer</p>
        </div>
        <div className="iconC">
          <img src="/Network_Neighborhood_Windows_98.png" alt="Icon C" />
          <p>Network Neighborhood</p> 
        </div>
        <div className="iconD">
          <img src="/bin.png" alt="Icon D" />
          <p>Recycle Bin</p>
        </div>
        <div className="iconE">
          <img src="/folder-icon.png" alt="Icon E" />
          <p>Online Services</p>
        </div>
        <div className="iconF">
          <img src="/iconmine-removebg-preview.png" alt="Icon F" />
          <p>Minecraft</p>
        </div>
      </div>
    </div>
  );
};

export default DinoGame;
