# Cyber Sentinel - Ransomware Detection and Prevention System

A comprehensive cybersecurity solution combining machine learning, real-time monitoring, and web-based dashboard for ransomware detection and prevention.

## 🏗️ Architecture

This repository contains three main components:

### 🖥️ Frontend (`cyber-sentinel-client`)
- **Technology**: React 18 + Vite + Tailwind CSS
- **Purpose**: Web-based dashboard for monitoring and visualization
- **Features**: Real-time NIDS monitoring, ML model performance tracking, ransomware simulation interface

### 🔧 Backend (`cyber-sentinel-server`) 
- **Technology**: Node.js + Express + MongoDB
- **Purpose**: API server and data management
- **Features**: RESTful APIs, WebSocket connections, database operations, authentication

### 🤖 ML Service (`cyber-sentinel-ml`)
- **Technology**: Python + Flask + Scikit-learn/TensorFlow
- **Purpose**: Machine learning models for ransomware detection
- **Features**: Real-time threat analysis, model training, prediction APIs

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- MongoDB

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ChetanMhaske/Ransomware-Detection-And-Prevention.git
cd Ransomware-Detection-And-Prevention
```

2. **Setup Frontend**
```bash
cd cyber-sentinel-client
npm install
npm run dev
```

3. **Setup Backend**
```bash
cd ../cyber-sentinel-server
npm install
npm start
```

4. **Setup ML Service**
```bash
cd ../cyber-sentinel-ml
pip install -r requirements.txt
python app.py
```

## 📁 Project Structure

```
Ransomware-Detection-And-Prevention/
├── cyber-sentinel-client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── hooks/
│   ├── public/
│   └── package.json
├── cyber-sentinel-server/          # Node.js backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   └── package.json
├── cyber-sentinel-ml/              # Python ML service
│   ├── models/
│   ├── data/
│   ├── notebooks/
│   ├── app.py
│   └── requirements.txt
└── README.md
```

## 🔧 Configuration

### Environment Variables

**Frontend (.env)**
```
VITE_API_URL=http://localhost:3000
VITE_ML_API_URL=http://localhost:5000
```

**Backend (.env)**
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/cyber-sentinel
JWT_SECRET=your-secret-key
ML_SERVICE_URL=http://localhost:5000
```

**ML Service (.env)**
```
FLASK_PORT=5000
MODEL_PATH=./models/
DATA_PATH=./data/
```

## 🌟 Features

- **Real-time Monitoring**: Live network traffic analysis and threat detection
- **Machine Learning**: Advanced ML models for ransomware pattern recognition
- **Interactive Dashboard**: Modern web interface with real-time updates
- **API Integration**: RESTful APIs connecting all components
- **Scalable Architecture**: Microservices-based design for easy scaling

## 🛡️ Security Features

- JWT-based authentication
- Encrypted data transmission
- Secure API endpoints
- Input validation and sanitization
- Rate limiting and DDoS protection

## 📊 Monitoring & Analytics

- Real-time threat detection alerts
- ML model performance metrics
- System health monitoring
- Historical data analysis
- Custom reporting dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Chetan Mhaske** - *Initial work* - [GitHub](https://github.com/ChetanMhaske) | [LinkedIn](https://www.linkedin.com/in/chetanmhaske)

## 🙏 Acknowledgments

- Built with modern web technologies for optimal performance
- Designed for cybersecurity professionals and researchers
- Implements industry best practices for security and scalability

## 📞 Support

For support, email your-email@example.com or create an issue in this repository.

---

**⚠️ Disclaimer**: This is a cybersecurity research and educational project. Use responsibly and in accordance with applicable laws and regulations.