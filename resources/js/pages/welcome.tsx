
import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome" />

            <div className="min-vh-100 bg-light">
                {/* Navigation Bar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                    <div className="container">
                        <Link href="/" className="navbar-brand fw-bold text-danger">
                            Laravel
                        </Link>

                        <div className="d-flex gap-2">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="btn btn-danger"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="btn btn-outline-danger"
                                    >
                                        Log in
                                    </Link>

                                    <Link
                                        href={register()}
                                        className="btn btn-danger"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="container py-5">
                    <div className="row align-items-center justify-content-center min-vh-75">

                        <div className="col-lg-6 mb-4">
                            <div className="card border-0 shadow-sm p-4">
                                <div className="card-body">
                                    <h1 className="fw-bold mb-3">
                                        Let's get started!
                                    </h1>

                                    <p className="text-secondary mb-4">
                                        Laravel has an incredibly rich ecosystem.
                                        We suggest starting with the following resources.
                                    </p>

                                    <div className="mb-4">
                                        <h5 className="fw-semibold">
                                            1. Laravel Documentation
                                        </h5>

                                        <p className="text-secondary">
                                            Learn more about Laravel through its official documentation.
                                        </p>

                                        <a
                                            href="https://laravel.com/docs"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline-danger btn-sm"
                                        >
                                            Read Documentation
                                        </a>
                                    </div>

                                    <div className="mb-4">
                                        <h5 className="fw-semibold">
                                            2. Laracasts
                                        </h5>

                                        <p className="text-secondary">
                                            Watch video tutorials to improve your Laravel skills.
                                        </p>

                                        <a
                                            href="https://laracasts.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline-danger btn-sm"
                                        >
                                            Watch Tutorials
                                        </a>
                                    </div>

                                    <a
                                        href="https://cloud.laravel.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-danger"
                                    >
                                        Deploy Now
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5 text-center">
                            <div className="bg-white rounded-4 shadow-sm p-5">
                                <h1 className="display-1 fw-bold text-danger">
                                    13
                                </h1>

                                <h3 className="fw-bold">
                                    Laravel
                                </h3>

                                <p className="text-secondary mb-0">
                                    Build amazing web applications with Laravel.
                                </p>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </>
    );
}
