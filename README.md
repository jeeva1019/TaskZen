# TaskZen

TaskZen is a simple and interactive to-do list application built using HTML, CSS, and JavaScript. It allows users to add, complete, delete, and filter tasks while storing them in local storage.

## Features

- **Add Tasks**: Users can add new tasks to the list.
- **Mark Tasks as Completed**: Tasks can be marked as completed by checking the checkbox.
- **Delete Tasks**: Users can delete tasks individually.
- **Filter Tasks**: Supports filtering tasks based on their status (All, Active, Completed).
- **Local Storage**: Tasks are stored in `localStorage`, so they persist even after refreshing the page.

## Technologies Used

- **HTML**: For structuring the user interface.
- **CSS**: For styling and layout (Bootstrap 5 used for additional styling).
- **JavaScript**: For interactivity and task management logic.

## Project Structure

```
TaskZen/
│── index.html     # Main HTML file
│── index.js       # JavaScript logic for task management
│── style.css      # Styling for the UI
│── logo.png       # (Optional) App icon
```

## How to Run

1. Download or clone the repository.
2. Open `index.html` in any web browser.

## File Breakdown

### 1. `index.html`
- Contains the structure of the application.
- Includes an input field for adding tasks, a task display section, and a filter selection.
- Imports Bootstrap and the app's CSS/JS files.

### 2. `index.js`
- Handles adding, completing, deleting, and filtering tasks.
- Uses `localStorage` to store tasks persistently.
- Updates UI dynamically based on user actions.

### 3. `style.css`
- Defines styles for UI elements.
- Includes transitions, scrollbar hiding, and hover effects.

## Usage

1. **Adding a Task**: Enter a task in the input field and click the `+` button.
2. **Marking a Task as Completed**: Click the checkbox next to a task.
3. **Deleting a Task**: Click the trash icon next to a task.
4. **Filtering Tasks**: Use the buttons (All, Active, Completed) to filter tasks.

## Screenshots
_(Add relevant screenshots if available)_

## Future Improvements
- Drag and drop for task reordering.
- Due date and notifications for tasks.
- Dark mode toggle.

## License
This project is open-source and free to use.

---

Enjoy using TaskZen! 🚀