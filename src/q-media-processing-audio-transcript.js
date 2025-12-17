export default function ({ user, weight = 0.75 }) {
  return {
    id: "media-processing-audio-transcript",
    title: "Extracting Audio and Transcripts with FFmpeg and Whisper",
    weight,

    description: `
The Orbit Ops media team recorded a public YouTube talk on incident postmortems
and needs a clean transcript for a highlight reel.

Your task is to extract and transcribe a **specific segment** of the audio.

Steps:
1. Download the audio from the provided YouTube video
   (you may use yt-dlp or any equivalent tool).
2. Clip the audio to include only the segment between:
   • Start time: 28.6 seconds
   • End time: 169.6 seconds
3. Generate a transcript using:
   • whisper, faster-whisper, or an equivalent speech-to-text tool
4. Lightly proofread the transcript:
   • Correct technical vocabulary if needed
   • Minor punctuation differences are acceptable
   • Do not paraphrase or summarize

Video link:
Mystery Story Audiobook (used by Orbit Ops for narration exercises)

Paste ONLY the transcript text corresponding to the 28.6–169.6 second segment.
`,

    input: {
      type: "none"
    },

    expectedOutput: {
      type: "string",
      description: "Transcript text for the specified audio segment"
    },

    grading: {
      type: "rubric",
      criteria: [
        "Transcript corresponds to the correct time window",
        "Spelling and technical terms are accurate",
        "No missing or extra content outside the segment",
        "Minimal unnecessary edits or paraphrasing"
      ]
    }
  };
}
