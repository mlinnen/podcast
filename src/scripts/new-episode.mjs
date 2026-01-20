import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import slugify from 'slugify';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EPISODES_PATH = path.join(__dirname, '../data/episodes.json');

async function main() {
    console.log('🎙️  New Episode Wizard 🎙️\n');

    const questions = [
        {
            type: 'input',
            name: 'title',
            message: 'Episode Title:',
            validate: (input) => input ? true : 'Title is required',
        },
        {
            type: 'input',
            name: 'description',
            message: 'Description:',
            validate: (input) => input ? true : 'Description is required',
        },
        {
            type: 'input',
            name: 'date',
            message: 'Publish Date (YYYY-MM-DD):',
            default: new Date().toISOString().split('T')[0],
            validate: (input) => /^\d{4}-\d{2}-\d{2}$/.test(input) ? true : 'Invalid date format',
        },
        {
            type: 'input',
            name: 'duration',
            message: 'Duration (MM:SS):',
            default: '00:00',
        },
        {
            type: 'input',
            name: 'audioUrl',
            message: 'Audio URL (mp3):',
        },
        {
            type: 'input',
            name: 'videoUrl',
            message: 'Video URL (optional):',
        },
    ];

    const answers = await inquirer.prompt(questions);

    // Generate derived fields
    const slug = slugify(answers.title, { lower: true, strict: true });

    // Read existing episodes
    let episodes = [];
    if (fs.existsSync(EPISODES_PATH)) {
        episodes = JSON.parse(fs.readFileSync(EPISODES_PATH, 'utf8'));
    }

    // Generate ID (simple numeric increment)
    const maxId = episodes.reduce((max, ep) => Math.max(max, parseInt(ep.id) || 0), 0);
    const newId = (maxId + 1).toString();

    const newEpisode = {
        id: newId,
        title: answers.title,
        slug: slug,
        description: answers.description,
        audioUrl: answers.audioUrl || "",
        videoUrl: answers.videoUrl || "",
        date: answers.date,
        duration: answers.duration,
        coverImage: "/images/episode-default.jpg" // Default or prompt for it
    };

    episodes.unshift(newEpisode); // Add to beginning of list

    fs.writeFileSync(EPISODES_PATH, JSON.stringify(episodes, null, 2));

    console.log('\n✅ Episode added successfully!');
    console.log(`Title: ${newEpisode.title}`);
    console.log(`Slug: ${newEpisode.slug}`);
    console.log(`ID: ${newEpisode.id}`);
}

main().catch(console.error);
