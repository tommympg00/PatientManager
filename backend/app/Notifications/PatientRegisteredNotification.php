<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PatientRegisteredNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $patient;

    /**
     * Create a new notification instance.
     */
    public function __construct($patient)
    {
        $this->patient = $patient;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Welcome to Our Community!')
            ->greeting("Hello {$this->patient->name},")
            ->line("We're thrilled to have you on board! Your registration was successfully completed, and you're now part of our community.")
            ->line("If you have any questions or need assistance, feel free to reach out. We're here to help!")
            ->salutation("Warm regards, the" . env('APP_NAME') . " Team");
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
