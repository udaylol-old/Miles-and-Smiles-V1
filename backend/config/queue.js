// config/queue.js
import Bull from 'bull';

// Create queues for different tasks
// Bull will create its own Redis connection based on these settings
const friendRequestQueue = new Bull('friend-requests', {
  redis: {
    port: parseInt(process.env.REDIS_PORT) || 6379,
    host: process.env.REDIS_HOST || 'localhost',
    password: process.env.REDIS_PASSWORD || undefined,
  },
  defaultJobOptions: {
    attempts: 3, // Retry 3 times if job fails
    backoff: {
      type: 'exponential',
      delay: 2000, // Start with 2 second delay
    },
    removeOnComplete: true, // Clean up completed jobs
    removeOnFail: false, // Keep failed jobs for debugging
  },
});

const notificationQueue = new Bull('notifications', {
  redis: {
    port: parseInt(process.env.REDIS_PORT) || 6379,
    host: process.env.REDIS_HOST || 'localhost',
    password: process.env.REDIS_PASSWORD || undefined,
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

// Optional: Monitor queue events for debugging
friendRequestQueue.on('completed', (job) => {
  console.log(`✅ Friend request job ${job.id} completed`);
});

friendRequestQueue.on('failed', (job, err) => {
  console.error(`❌ Friend request job ${job.id} failed:`, err.message);
});

notificationQueue.on('completed', (job) => {
  console.log(`✅ Notification job ${job.id} completed`);
});

notificationQueue.on('failed', (job, err) => {
  console.error(`❌ Notification job ${job.id} failed:`, err.message);
});

// ES6 export
export { friendRequestQueue, notificationQueue };