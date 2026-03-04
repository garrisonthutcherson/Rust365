
# Initializing the Rust365 Message Board

To get the board up and running, you need to populate the `categories` and `subCategories` collections in Firestore.

## Option 1: Automated (Recommended)
1. Register an account on your app or log in.
2. Navigate to `[your-app-url]/admin/seed`.
3. Click the **"INITIALIZE BOARD STRUCTURE"** button.

## Option 2: Manual (via Firebase Console)

### 1. Categories
Add these documents to the `categories` collection:

| Document ID | name | order | description |
| :--- | :--- | :--- | :--- |
| `hub` | General Hub | 1 | The main gathering place for survivors. |
| `tactical` | Tactical Room | 2 | Strategies, base designs, and raiding intel. |
| `support` | Support | 3 | Technical help and community meta. |

### 2. Sub-Categories
Add these documents to the `subCategories` collection:

| Document ID | categoryId | name | order | description | topicCount | postCount |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `general` | `hub` | General Discussion | 1 | Talk about anything Rust related. | 0 | 0 |
| `intro` | `hub` | Introductions | 2 | New to the island? Say hello here. | 0 | 0 |
| `building` | `tactical` | Base Building | 1 | Show off your honeycombs and circuits. | 0 | 0 |
| `pvp` | `tactical` | Raiding & PvP | 2 | Tips for dominating monument runs. | 0 | 0 |
| `bugs` | `support` | Bug Reports | 1 | Encountered a glitch? Report it here. | 0 | 0 |

---
*Note: Ensure the `categoryId` in `subCategories` exactly matches the ID of the category it belongs to.*
