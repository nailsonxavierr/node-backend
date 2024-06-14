import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Importar rotas
import AuthRoutes from '../routes/authRoutes';
import TeacherRoutes from '../routes/teacherRoutes';
import SubjectRoutes from '../routes/subjectRoutes';
import ScheduleRoutes from '../routes/scheduleRoutes';

// Inicializar o app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Usar rotas
app.use('/auth', AuthRoutes);
app.use('/teacher', TeacherRoutes);
app.use('/subject', SubjectRoutes);
app.use('/schedule', ScheduleRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
