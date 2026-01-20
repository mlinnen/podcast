import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import inquirer from 'inquirer';
import slugify from 'slugify';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EPISODES_PATH = path.join(__dirname, '../data/episodes.json');

async function main() {
    console.log('🎙️  Update Episode Wizard 🎙️\n');

    if (!fs.existsSync(EPISODES_PATH)) {
        console.error('❌ No episodes.json found!');
        return;
    }

    let episodes = JSON.parse(fs.readFileSync(EPISODES_PATH, 'utf8'));

    if (episodes.length === 0) {
        console.error('❌ No episodes found to update!');
        return;
    }

    // 1. Select Episode
    const { episodeId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'episodeId',
            message: 'Select an episode to update:',
            choices: episodes.map(ep => ({
                name: `${ep.title} (ID: ${ep.id})`,
                value: ep.id
            }))
        }
    ]);

    const episodeIndex = episodes.findIndex(ep => ep.id === episodeId);
    const episode = episodes[episodeIndex];

    console.log(`\nUpdating: ${episode.title}\n`);

    // 2. Select Fields to Update
    const { fields } = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'fields',
            message: 'Which fields do you want to update?',
            choices: [
                { name: 'Title', value: 'title' },
                { name: 'Description', value: 'description' },
                { name: 'Publish Date', value: 'date' },
                { name: 'Duration', value: 'duration' },
                { name: 'Audio URL', value: 'audioUrl' },
                { name: 'Video URL', value: 'videoUrl' },
                { name: 'Cover Image', value: 'coverImage' },
            ]
        }
    ]);

    if (fields.length === 0) {
        console.log('No fields selected. Exiting.');
        return;
    }

    // 3. Input New Values
    const questions = [];

    if (fields.includes('title')) {
        questions.push({
            type: 'input',
            name: 'title',
            message: 'New Title:',
            default: episode.title,
            validate: (input) => input ? true : 'Title is required',
        });
    }

    if (fields.includes('description')) {
        questions.push({
            type: 'input',
            name: 'description',
            message: 'New Description:',
            default: episode.description,
            validate: (input) => input ? true : 'Description is required',
        });
    }

    if (fields.includes('date')) {
        questions.push({
            type: 'input',
            name: 'date',
            message: 'New Publish Date (YYYY-MM-DD):',
            default: episode.date,
            validate: (input) => /^\d{4}-\d{2}-\d{2}$/.test(input) ? true : 'Invalid date format',
        });
    }

    if (fields.includes('duration')) {
        questions.push({
            type: 'input',
            name: 'duration',
            message: 'New Duration (MM:SS):',
            default: episode.duration,
        });
    }

    if (fields.includes('audioUrl')) {
        questions.push({
            type: 'input',
            name: 'audioUrl',
            message: 'New Audio URL:',
            default: episode.audioUrl,
        });
    }

    if (fields.includes('videoUrl')) {
        questions.push({
            type: 'input',
            name: 'videoUrl',
            message: 'New Video URL:',
            default: episode.videoUrl,
        });
    }

    if (fields.includes('coverImage')) {
        questions.push({
            type: 'input',
            name: 'coverImage',
            message: 'New Cover Image Path:',
            default: episode.coverImage,
        });
    }

    const updates = await inquirer.prompt(questions);

    // Update the episode object
    Object.assign(episode, updates);

    // If title changed, ask to update slug
    if (updates.title && updates.title !== episode.title) {
        const newSlug = slugify(updates.title, { lower: true, strict: true });
        const { updateSlug } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'updateSlug',
                message: `Update slug to "${newSlug}"? (Current: ${episode.slug})`,
                default: true
            }
        ]);

        if (updateSlug) {
            episode.slug = newSlug;
        }
    }

    // Save back to file
    episodes[episodeIndex] = episode;
    fs.writeFileSync(EPISODES_PATH, JSON.stringify(episodes, null, 2));

    console.log('\n✅ Episode updated successfully!');

    try {
        console.log('🔄 Regenerating RSS feed...');
        execSync('node src/scripts/generate-rss.mjs', { stdio: 'inherit' });
    } catch (error) {
        console.error('❌ Failed to regenerate RSS feed:', error.message);
    }
}

main().catch(console.error);
