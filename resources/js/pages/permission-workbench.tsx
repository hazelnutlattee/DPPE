import { Head, router } from '@inertiajs/react'; //tukar hok ni se tambah router
import { useEffect, useState } from 'react'; //tukar hok ni se tambah useEffect untuk load senarai review yang telah disimpan

export default function PermissionWorkbench() {
    const [choices, setChoices] = useState({
        permission1: '',
        permission2: '',
        permission3: '',
        permission4: '',
    });

    const [message, setMessage] = useState('');
    const [reviews, setReviews] = useState< //identify ID bagi setiap review
        {
            id: number;
            permission1: string;
            permission2: string;
            permission3: string;
            permission4: string;
        }[]
    >([]);

    useEffect(() => { //untuk mintak senarai review yang dah di store 
        fetch('/my-reviews')
            .then((response) => response.json())
            .then((data) => setReviews(data));
    }, []);

    const permissions = [
        { key: 'permission1', label: 'Location Access' },
        { key: 'permission2', label: 'Camera Access' },
        { key: 'permission3', label: 'Microphone Access' },
        { key: 'permission4', label: 'Notification Access' },
    ] as const;

    const completed = Object.values(choices).filter(
        (choice) => choice !== '',
    ).length;

    function checkChoices() {
        if (completed === 4) {
            setMessage('All choices are complete!');
        } else {
            setMessage(`You have completed ${completed} out of 4 choices.`);
        }
    }

    //tambah hok ni untuk display review message
    const saveReview = () => {
    if (completed !== 4) {
        alert('Please complete all four choices first.');
        return;
    }

            router.post('/permission-reviews', choices, { //hok ni once dah tekan save review nanti pop up message "Review saved successfully!"
        onSuccess: () => {
            setMessage('Review saved successfully!');

            fetch('/my-reviews')
                .then((response) => response.json())
                .then((data) => setReviews(data));
        },
    });
    };

    function selectChoice(
        permission: keyof typeof choices,
        value: 'Allow' | 'Deny',
    ) {
        setChoices((previous) => ({
            ...previous,
            [permission]: value,
        }));

        setMessage('');
    }

    return (
        <>
            <Head title="Permission Workbench" />

            <div className="flex flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold">
                        Permission Workbench
                    </h1>

                    <p className="text-muted-foreground">
                        Review and select permissions below.
                    </p>
                </div>

                <div className="rounded-xl border p-4">
                    <h2 className="mb-2 font-semibold">
                        Completeness
                    </h2>

                    <p>
                        {completed} / 4 permissions completed
                    </p>

                    <div className="mt-3 h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                            className="h-3 rounded-full bg-blue-600 transition-all"
                            style={{
                                width: `${(completed / 4) * 100}%`,
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {permissions.map((permission) => (
                        <div
                            key={permission.key}
                            className="flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <h2 className="font-medium">
                                {permission.label}
                            </h2>

                            <div className="flex gap-2">
                                <button
                                    onClick={() =>
                                        selectChoice(
                                            permission.key,
                                            'Allow',
                                        )
                                    }
                                    className={`rounded-md border px-4 py-2 ${
                                        choices[permission.key] ===
                                        'Allow'
                                            ? 'bg-green-600 text-white'
                                            : 'border-gray-300 bg-[white] text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white'
                                    }`}
                                >
                                    Allow
                                </button>

                                <button
                                    onClick={() =>
                                        selectChoice(
                                            permission.key,
                                            'Deny',
                                        )
                                    }
                                    className={`rounded-md border px-4 py-2 ${
                                        choices[permission.key] ===
                                        'Deny'
                                            ? 'bg-red-600 text-white'
                                            : 'border-gray-300 bg-[white] text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white'
                                    }`}
                                >
                                    Deny
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={checkChoices}
                    className="w-fit rounded-md bg-black text-white dark:bg-gray-100 dark:text-gray-900"
                >
                    Check Choices
                </button>

                {/*tambah button hok ni untuk save review*/}
                <button
                    onClick={saveReview}
                    className="w-fit rounded-md bg-blue-600 px-5 py-2 text-white"
                >
                    Save Review
                </button>

                {message && (
                    <div className="rounded-md border p-4">
                        {message}
                    </div>
                )}

                {/*display the review from the database*/}
                <div className="rounded-xl border p-4">
                    <h2 className="mb-4 text-lg font-bold">My Reviews</h2>

                    {reviews.length === 0 ? (
                        <p>No reviews saved yet.</p>
                    ) : (
                        reviews.map((review) => ( //display the review from the database
                            <div key={review.id} className="mb-3 rounded-md border p-3">
                                <p>Location: {review.permission1}</p>
                                <p>Camera: {review.permission2}</p>
                                <p>Microphone: {review.permission3}</p>
                                <p>Notifications: {review.permission4}</p>

                                <button //delete review hok ni
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to delete this review?')) {
                                            router.delete(`/permission-reviews/${review.id}`, {
                                                onSuccess: () => {
                                                    setReviews((previous) =>
                                                        previous.filter((item) => item.id !== review.id),
                                                    );
                                                },
                                            });
                                        }
                                    }}
                                    className="mt-3 rounded-md bg-red-600 px-4 py-2 text-white"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}